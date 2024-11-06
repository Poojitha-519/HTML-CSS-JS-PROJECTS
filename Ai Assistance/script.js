const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";
console.log(recognition);
const btn = document.querySelector("#listen-btn");

function startListening() {
  btn.innerHTML = "Listening...👂";
  btn.classList.add("listening");
  recognition.start();

  // Handle the result when a command is recognized
  recognition.onresult = function (event) {
    console.log(event);
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  // Reset button text and style when recognition ends
  recognition.onend = function () {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
  };
}

// Define handleCommand to perform actions based on the recognized command
function handleCommand(command) {
  if (command.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com", "_blank");
  } else if (command.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com", "_blank");
  } else if (command.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com", "_blank");
  } else if (command.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com", "_blank");
  } else if (command.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("https://www.whatsapp.com", "_blank");
  } else {
    speak("Sorry, I didn't understand that command.");
  }
}

// Function to convert text to speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Attach click event listener to start the listening process
btn.addEventListener("click", startListening);
