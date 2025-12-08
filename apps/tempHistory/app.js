// Tent Temperature Logger for Bangle.js 2
// Logs temperature every 15 minutes, displays current temp with 24hr high/low

// Configuration
const LOG_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
const BACKLIGHT_TIMEOUT = 10 * 1000; // 10 seconds

// Data storage
let tempLog = []; // Array of {time: timestamp, temp: fahrenheit}
let currentView = 'main'; // 'main', 'hourly', or 'detail'
let selectedHour = null;
let backlightTimer = null;

// Convert Celsius to Fahrenheit
function toFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

// Format temperature for display
function formatTemp(temp) {
  return temp.toFixed(1) + "°F";
}

// Format time in 12-hour format with AM/PM
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

// Format date for hour display (just hour with AM/PM)
function formatHour(date) {
  let hours = date.getHours();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ':00 ' + ampm;
}

// Get current temperature (asynchronous)
function getCurrentTemp(callback) {
  // Bangle.js 2 gets temperature from pressure sensor (returns a Promise)
  Bangle.getPressure().then(pressure => {
    if (pressure && pressure.temperature !== undefined) {
      callback(toFahrenheit(pressure.temperature));
    } else {
      callback(null);
    }
  }).catch(() => {
    callback(null);
  });
}

// Log temperature reading
function logTemp() {
  const now = new Date();
  
  getCurrentTemp(temp => {
    // Only log if we have a valid temperature
    if (temp !== null) {
      tempLog.push({time: now.getTime(), temp: temp});
      
      // Keep only last 24 hours of data
      const cutoff = now.getTime() - (24 * 60 * 60 * 1000);
      tempLog = tempLog.filter(entry => entry.time >= cutoff);
    }
    
    // Redraw if on main screen
    if (currentView === 'main') {
      drawMainScreen();
    }
  });
}

// Get high/low temps from last 24 hours
function getHighLow() {
  if (tempLog.length === 0) {
    return null;
  }
  
  let high = tempLog[0];
  let low = tempLog[0];
  
  tempLog.forEach(entry => {
    if (entry.temp > high.temp) high = entry;
    if (entry.temp < low.temp) low = entry;
  });
  
  return {
    high: {temp: high.temp, time: new Date(high.time)},
    low: {temp: low.temp, time: new Date(low.time)}
  };
}

// Get hourly averages for last 24 hours
function getHourlyAverages() {
  const now = new Date();
  const hourlyData = [];
  
  // Go through last 24 hours
  for (let i = 0; i < 24; i++) {
    const hourStart = new Date(now.getTime() - (i * 60 * 60 * 1000));
    hourStart.setMinutes(0, 0, 0);
    const hourEnd = new Date(hourStart.getTime() + (60 * 60 * 1000));
    
    // Find all readings in this hour
    const readings = tempLog.filter(entry => 
      entry.time >= hourStart.getTime() && entry.time < hourEnd.getTime()
    );
    
    if (readings.length > 0) {
      const avg = readings.reduce((sum, r) => sum + r.temp, 0) / readings.length;
      hourlyData.push({
        hour: hourStart,
        avg: avg,
        readings: readings
      });
    }
  }
  
  return hourlyData.reverse(); // Oldest to newest
}

// Get 15-minute readings for a specific hour
function getFifteenMinuteReadings(hourDate) {
  const readings = [];
  
  for (let i = 0; i < 4; i++) {
    const quarterHour = new Date(hourDate.getTime() + (i * 15 * 60 * 1000));
    const quarterEnd = new Date(quarterHour.getTime() + (15 * 60 * 1000));
    
    // Find reading closest to this 15-minute mark
    const relevantReadings = tempLog.filter(entry =>
      entry.time >= quarterHour.getTime() && entry.time < quarterEnd.getTime()
    );
    
    if (relevantReadings.length > 0) {
      // Use the first reading in this window
      readings.push({
        time: new Date(relevantReadings[0].time),
        temp: relevantReadings[0].temp
      });
    } else {
      readings.push({
        time: quarterHour,
        temp: null // No reading available
      });
    }
  }
  
  return readings;
}

// Turn on backlight with timeout
function activateBacklight() {
  Bangle.setLCDBrightness(1); // Turn on backlight
  
  // Clear existing timer
  if (backlightTimer) {
    clearTimeout(backlightTimer);
  }
  
  // Set new timer to turn off backlight
  backlightTimer = setTimeout(() => {
    Bangle.setLCDBrightness(0); // Turn off backlight but screen stays on
  }, BACKLIGHT_TIMEOUT);
}

// Draw main screen
function drawMainScreen() {
  g.clear();
  currentView = 'main';
  
  const highLow = getHighLow();
  
  // Current temperature (large)
  g.setFont("6x8", 3);
  g.setFontAlign(0, 0);
  g.drawString("Current:", 88, 30);
  
  // Show "Reading..." while waiting for temperature
  g.setFont("6x8", 2);
  g.drawString("Reading...", 88, 65);
  
  // Get current temperature asynchronously
  getCurrentTemp(currentTemp => {
    if (currentTemp !== null) {
      // Clear the "Reading..." text and draw actual temperature
      g.clearRect(20, 50, 156, 80);
      g.setFont("6x8", 4);
      g.setFontAlign(0, 0);
      g.drawString(formatTemp(currentTemp), 88, 65);
    }
  });
  
  // High and Low
  if (highLow) {
    g.setFont("6x8", 2);
    g.setFontAlign(0, 0);
    
    // High
    g.drawString("High: " + formatTemp(highLow.high.temp), 88, 110);
    g.setFont("6x8", 1);
    g.drawString("at " + formatTime(highLow.high.time), 88, 130);
    
    // Low
    g.setFont("6x8", 2);
    g.drawString("Low: " + formatTemp(highLow.low.temp), 88, 155);
    g.setFont("6x8", 1);
    g.drawString("at " + formatTime(highLow.low.time), 88, 175);
  }
}

// Draw hourly view
function drawHourlyView() {
  g.clear();
  currentView = 'hourly';
  
  const hourlyData = getHourlyAverages();
  
  // Header
  g.setFont("6x8", 2);
  g.setFontAlign(0, 0);
  g.drawString("← Back", 88, 10);
  
  // List of hours (scrollable)
  g.setFont("6x8", 1.5);
  g.setFontAlign(-1, -1);
  
  let y = 35;
  hourlyData.forEach((data, index) => {
    if (y < 170) { // Don't draw off screen
      const timeStr = formatHour(data.hour);
      const tempStr = formatTemp(data.avg);
      g.drawString(timeStr + "  " + tempStr, 10, y);
      y += 20;
    }
  });
  
  // Store hourly data for touch selection
  drawHourlyView.hourlyData = hourlyData;
}

// Draw 15-minute detail view
function drawDetailView(hourDate) {
  g.clear();
  currentView = 'detail';
  
  const readings = getFifteenMinuteReadings(hourDate);
  
  // Header
  g.setFont("6x8", 2);
  g.setFontAlign(0, 0);
  g.drawString("← Back  " + formatHour(hourDate), 88, 10);
  
  // 15-minute readings
  g.setFont("6x8", 1.5);
  g.setFontAlign(-1, -1);
  
  let y = 40;
  readings.forEach(reading => {
    const timeStr = formatTime(reading.time);
    const tempStr = reading.temp !== null ? formatTemp(reading.temp) : "No data";
    g.drawString(timeStr + "  " + tempStr, 10, y);
    y += 25;
  });
}

// Handle button press
function onButton() {
  activateBacklight();
  
  if (currentView === 'main') {
    drawHourlyView();
  } else if (currentView === 'hourly') {
    drawMainScreen();
  } else if (currentView === 'detail') {
    drawHourlyView();
  }
}

// Handle touch
function onTouch(button, xy) {
  activateBacklight();
  
  if (currentView === 'hourly') {
    // Check if touch is on back button
    if (xy.y < 30) {
      drawMainScreen();
      return;
    }
    
    // Check if touch is on an hour entry
    const hourlyData = drawHourlyView.hourlyData || [];
    const touchIndex = Math.floor((xy.y - 35) / 20);
    
    if (touchIndex >= 0 && touchIndex < hourlyData.length) {
      drawDetailView(hourlyData[touchIndex].hour);
    }
  } else if (currentView === 'detail') {
    // Check if touch is on back button
    if (xy.y < 30) {
      drawHourlyView();
    }
  }
}

// Initialize app
function init() {
  // Clear screen
  g.clear();
  
  // Set up button handler (short press only)
  setWatch(onButton, BTN, {repeat: true, edge: "falling"});
  
  // Set up touch handler
  Bangle.on('touch', onTouch);
  
  // Take initial reading
  logTemp();
  
  // Set up interval for logging
  setInterval(logTemp, LOG_INTERVAL);
  
  // Draw main screen
  drawMainScreen();
  
  // Turn on backlight initially
  activateBacklight();
}

// Start the app
init();
