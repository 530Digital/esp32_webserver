document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("ledButton");
  const lightbulb = document.getElementById("lightbulb");
  const ledIcon = document.getElementById("ledIcon");

  function updateButton(state) {
    if (state === "on") {
      button.textContent = "ON";
      button.classList.remove("off");
      button.classList.add("on");
    } else {
      button.textContent = "OFF";
      button.classList.remove("on");
      button.classList.add("off");
    }
  }

  function updateLightbulb(state) {
    if (state === "on") {
      lightbulb.classList.remove("off");
      lightbulb.classList.add("on");
    } else {
      lightbulb.classList.remove("on");
      lightbulb.classList.add("off");
    }
  }

  function updateIcon(state) {
    if (state === "on") {
      ledIcon.classList.remove("off");
      ledIcon.classList.add("on");
    } else {
      ledIcon.classList.remove("on");
      ledIcon.classList.add("off");
    }
  }

  button.addEventListener("click", function () {
    const currentState = button.classList.contains("on") ? "on" : "off";
    const newState = currentState === "on" ? "off" : "on";

    fetch(`/led?state=${newState}`)
      .then((response) => {
        if (response.ok) {
          updateButton(newState);
          updateLightbulb(newState);
          updateIcon(newState);
        } else {
          console.error("Failed to update LED state");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  lightbulb.addEventListener("click", function () {
    const currentState = lightbulb.classList.contains("on") ? "on" : "off";
    const newState = currentState === "on" ? "off" : "on";

    fetch(`/led?state=${newState}`)
      .then((response) => {
        if (response.ok) {
          updateLightbulb(newState);
          updateButton(newState);
          updateIcon(newState);
        } else {
          console.error("Failed to update LED state");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  // Initialize button, lightbulb, and icon state
  fetch("/led/state")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch LED state");
      }
      return response.text();
    })
    .then((state) => {
      updateButton(state);
      updateLightbulb(state);
      updateIcon(state);
    })
    .catch((error) => {
      console.error("Error fetching initial state:", error);
    });
});
