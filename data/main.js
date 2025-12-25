document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("ledButton");

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

  button.addEventListener("click", function () {
    const currentState = button.classList.contains("on") ? "on" : "off";
    const newState = currentState === "on" ? "off" : "on";

    fetch(`/led?state=${newState}`)
      .then((response) => {
        if (response.ok) {
          updateButton(newState);
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
          updateButton(newState);
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
    })
    .catch((error) => {
      console.error("Error fetching initial state:", error);
    });
});
