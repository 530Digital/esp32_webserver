# ESP32 Web Server with LED Control

This project implements a web server on an ESP32 microcontroller to control an onboard LED. The LED state can be toggled via a web interface.

## Features

- **Web Interface**: A user-friendly webpage to control the LED.
- **Dynamic State Synchronization**: The webpage reflects the current state of the LED. [Known Bug](https://github.com/530Digital/esp32_webserver/issues/1)
- **Environment Variables**: Wi-Fi credentials are securely stored in a `.env` file and loaded at runtime.

## Project Structure

```
ESP32 Web Server
├── data/
│   ├── index.html       # Webpage for LED control
│   ├── styles.css       # Styling for the webpage
│   ├── main.js          # JavaScript for dynamic functionality
│   └── .env             # Environment file for Wi-Fi credentials
├── src/
│   └── main.cpp         # Main application code
├── platformio.ini       # PlatformIO configuration file
└── README.md            # Project documentation
```

## Setup Instructions

1. **Install the PlatformIO Extension for VSCode**:

   - Install the [PlatformIO](https://docs.platformio.org/en/latest/integration/ide/vscode.html) VSCode Extension.

2. **Configure Wi-Fi Credentials**:

   - Create a `.env` file in the `data/` directory with the following content:
     ```
     WIFI_SSID=YourWiFiSSID
     WIFI_PASSWORD=YourWiFiPassword
     ```

3. **Build and Upload Filesystem**:

   - Run the following tasks in PlatformIO:
     - `Build Filesystem Image`
     - `Upload Filesystem Image`

4. **Build and Upload Firmware**:

   - Run the `Upload` task to flash the firmware to the ESP32.

5. **Access the Web Interface**:
   - Open a browser and navigate to the ESP32's IP address (displayed in the serial monitor).

## Usage

- **Toggle LED**: Click the button on the webpage to turn the LED on or off.

## Dependencies

- **ESPAsyncWebServer**: For handling HTTP requests.
- **LittleFS**: For storing the webpage and `.env` file.

## License

This project is licensed under the MIT License.
