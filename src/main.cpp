#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>

// Function to load .env variables
String getEnvVariable(const char* filename, const char* key) {
  File file = LittleFS.open(filename, "r");
  if (!file) {
    Serial.println("Failed to open .env file");
    return "";
  }

  while (file.available()) {
    String line = file.readStringUntil('\n');
    line.trim();
    if (line.startsWith(key)) {
      int delimiterIndex = line.indexOf('=');
      if (delimiterIndex != -1) {
        String value = line.substring(delimiterIndex + 1);
        Serial.print("Loaded ");
        Serial.print(key);
        Serial.print(": ");
        Serial.println(value);
        return value;
      }
    }
  }

  file.close();
  Serial.print("Key not found in .env file: ");
  Serial.println(key);
  return "";
}

// Replace with your network credentials
String ssid;
String password;

AsyncWebServer server(80);

// Track the state of the LED
bool ledState = false;

void setup() {
  Serial.begin(115200);

  // Initialize LED_BUILTIN
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW); // Ensure LED is off initially

  // Initialize LittleFS
  if (!LittleFS.begin(true)) {
    Serial.println("An Error has occurred while mounting LittleFS");
    return;
  }

  // Load Wi-Fi credentials from .env file
  ssid = getEnvVariable("/.env", "WIFI_SSID");
  password = getEnvVariable("/.env", "WIFI_PASSWORD");

  if (ssid.isEmpty() || password.isEmpty()) {
    Serial.println("Failed to load Wi-Fi credentials from .env file");
    return;
  }

  // Connect to Wi-Fi
  Serial.print("Connecting to WiFi SSID: ");
  Serial.println(ssid);
  WiFi.begin(ssid.c_str(), password.c_str());
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Print ESP32 Local IP Address
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Specific route for the homepage
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(LittleFS, "/index.html", "text/html");
  });

  // Route to handle LED control
  server.on("/led", HTTP_GET, [](AsyncWebServerRequest *request) {
    if (request->hasParam("state")) {
      String state = request->getParam("state")->value();
      if (state == "on") {
        digitalWrite(LED_BUILTIN, HIGH);
        ledState = true;
        Serial.println("LED turned ON");
      } else if (state == "off") {
        digitalWrite(LED_BUILTIN, LOW);
        ledState = false;
        Serial.println("LED turned OFF");
      }
      request->send(200, "text/plain", "OK");
    } else {
      request->send(400, "text/plain", "Missing state parameter");
    }
  });

  // Route to get the current LED state
  server.on("/led/state", HTTP_GET, [](AsyncWebServerRequest *request) {
    String state = ledState ? "on" : "off";
    request->send(200, "text/plain", state);
  });

  // CATCH-ALL for CSS, JS, and Images
  server.serveStatic("/", LittleFS, "/");

  server.begin();
}

void loop() {
  // No additional code in loop as LED is controlled via HTTP requests
}
