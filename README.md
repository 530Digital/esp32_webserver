# ESP32 Web Server with LED Control

This project implements a web server on an ESP32 microcontroller to control an onboard LED. The LED state can be toggled on/off via a web interface.

## ESP32 Board

I used these ESP32 boards from amazon: https://a.co/d/3pACbnY (not an affiliate link)

## Features

- **Web Interface**: A user-friendly webpage to control the LED.
- **Dynamic State Synchronization**: The webpage reflects the current state of the LED.
- **Environment Variables**: Wi-Fi credentials are securely stored in a `.env` file and loaded at runtime.

## Project Structure

```
ESP32 Web Server
├── .vscode/
│   ├── extensions.json                     # Recommended extensions for the workspace
├── data/
│   ├── .env_example                        # Example environment file for Wi-Fi credentials
│   ├── index.html                          # Webpage for LED control
│   ├── styles.css                          # Styling for the webpage
│   ├── main.js                             # JavaScript for dynamic functionality
├── src/
│   └── main.cpp                            # Main application code
├── .gitignore                              # gitignore file
├── esp32_webserver.code-workspace          # VSCode workspace config file
├── platformio.ini                          # PlatformIO configuration file
└── README.md                               # Project documentation
```

## Setup Instructions

This assumes you are using VSCode for your project. If not you can get VSCode from: https://code.visualstudio.com/

1. **Install the PlatformIO Extension for VSCode**:

   - Install the [PlatformIO](https://docs.platformio.org/en/latest/integration/ide/vscode.html) VSCode Extension.

2. **Configure Wi-Fi Credentials**:

   - Rename the `.env_example` file located in the data director to `.env` and update the vales for WIFI_SSID and WIFI_PASSWORD.
     ```
     WIFI_SSID=YourWiFiSSID
     WIFI_PASSWORD=YourWiFiPassword
     ```

3. **Build and Upload Firmware**:

   - Anytime you update the main.cpp file you will need to run `PlatformIO: Upload` to flash the firmware to the ESP32.
     - This step is not required if you are only updating the files located in the data directory.

4. **Build and Upload Filesystem**:

   - Anytime you modify the files in the data directory you will want to run `Build Filesystem Image` and `Upload Filesystem Image`. You do not have to upload the firmware if you only modified files in the data directory.

5. **Access the Web Interface**:

   - Open a browser and navigate to the ESP32's IP address (displayed in the serial monitor).

## Usage

- **Toggle LED**: Click the button on the webpage to turn the LED on or off. [Known Bug](https://github.com/530Digital/esp32_webserver/issues/1)

## Dependencies

- **ESPAsyncWebServer**: For handling HTTP requests.
- **LittleFS**: For storing the webpage and `.env` file.

## License

This project is licensed under the MIT License.
