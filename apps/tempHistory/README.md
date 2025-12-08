# Tent Temperature Logger

A simple temperature logging app for camping trips. Perfect for tracking overnight temperature changes in your tent.

## Features

- **Main Screen**: Displays current temperature plus 24-hour high and low with timestamps
- **Hourly View**: Press button to see average temperature for each hour
- **15-Minute Detail**: Tap any hour to see temperature readings in 15-minute increments
- **Auto-logging**: Records temperature every 15 minutes automatically
- **24-Hour Rolling Window**: Keeps only the last 24 hours of data
- **Long Press to Clear**: Hold the button to clear all data and start fresh

## Usage

1. Install the app from your personal App Loader
2. Launch the app from your Bangle.js menu
3. Place the device in your tent (not on your wrist for accurate readings)
4. Press the button to view hourly averages
5. Tap any hour to see 15-minute detail
6. Use the back buttons to navigate back
7. Long press the button to clear data

## Display Format

- Temperature: Fahrenheit
- Time: 12-hour format with AM/PM
- Backlight: Auto-dims after 10 seconds (press button to wake)

## Notes

- The app uses the pressure sensor's temperature reading
- For best accuracy, keep the device away from heat sources
- Data is cleared when the app is closed or device is restarted
- Designed for use as a stationary logger, not a wearable
- I asked Claude.ai to make this
- Temperature icon by Icons8
