// Affirmations App for Bangle.js 2
// Blue background with white text
// Press button to advance to next random affirmation

// Array of affirmations - your custom affirmations
const affirmations = [
  "I am capable and strong",
  "I deserve good things",
  "I am learning and growing",
  "I trust myself",
  "I am enough as I am",
  "I choose peace today",
  "I am worthy of love",
  "I can handle challenges",
  "I am making progress",
  "I believe in myself"
];

let currentAffirmationIndex = 0;
let usedIndices = [];

// Function to get a random affirmation that hasn't been shown recently
function getRandomAffirmation() {
  // If we've shown all affirmations, reset the used array
  if (usedIndices.length >= affirmations.length) {
    usedIndices = [];
  }
  
  let availableIndices = [];
  for (let i = 0; i < affirmations.length; i++) {
    if (usedIndices.indexOf(i) === -1) {
      availableIndices.push(i);
    }
  }
  
  // Pick a random index from available ones
  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  currentAffirmationIndex = availableIndices[randomIndex];
  usedIndices.push(currentAffirmationIndex);
  
  return affirmations[currentAffirmationIndex];
}

// Function to display an affirmation
function showAffirmation() {
  // Clear screen with blue background
  g.clear();
  g.setBgColor(0, 0, 1); // Blue background (RGB: 0,0,1)
  g.setColor(1, 1, 1);   // White text (RGB: 1,1,1)
  g.clearRect(0, 0, g.getWidth(), g.getHeight()); // Fill with background color
  
  // Set font to a readable size
  g.setFont("Vector", 16);
  
  // Get current affirmation
  const affirmation = getRandomAffirmation();
  
  // Calculate text positioning for center alignment
  const textWidth = g.stringWidth(affirmation);
  const screenWidth = g.getWidth();
  const screenHeight = g.getHeight();
  
  // If text is too wide, wrap it
  if (textWidth > screenWidth - 20) {
    // Split into words and wrap
    const words = affirmation.split(" ");
    let lines = [];
    let currentLine = "";
    
    for (let word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      if (g.stringWidth(testLine) > screenWidth - 20) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word); // Single word too long, force it
        }
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    
    // Draw wrapped text
    const lineHeight = 20;
    const totalTextHeight = lines.length * lineHeight;
    const startY = (screenHeight - totalTextHeight) / 2;
    
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = g.stringWidth(lines[i]);
      const x = (screenWidth - lineWidth) / 2;
      const y = startY + (i * lineHeight);
      g.drawString(lines[i], x, y);
    }
  } else {
    // Single line - center it
    const x = (screenWidth - textWidth) / 2;
    const y = screenHeight / 2;
    g.drawString(affirmation, x, y);
  }
  
  // Add instruction at bottom
  g.setFont("Vector", 10);
  g.setColor(1, 1, 1); // White for instruction
  const instruction = "Press button for next";
  const instructionWidth = g.stringWidth(instruction);
  const instructionX = (screenWidth - instructionWidth) / 2;
  g.drawString(instruction, instructionX, screenHeight - 25);
  
  // Update display
  g.flip();
}

// Button press handler
function onButtonPress() {
  showAffirmation();
}

// Set up button watch
setWatch(onButtonPress, BTN1, { repeat: true, edge: "falling" });

// Show first affirmation
showAffirmation();

// Clean up function for when app exits
E.on('kill', function() {
  // Remove button watch
  clearWatch();
});
