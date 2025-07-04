// Check for Speech Recognition support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support speech recognition. Please use Chrome.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false; // Stops after one input
  recognition.interimResults = false; // Returns only final result
  recognition.maxAlternatives = 1; // Ensures one best match

  const btn = document.querySelector("#listen-btn");

  // Function to convert text to speech
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  // Function to handle recognized commands
  function handleCommand(command) {
    console.log("Recognized:", command);

    if (command.includes("open youtube")) {
      let words = command.split(" ");
      let index = words.indexOf("youtube");

      if (index !== -1 && words.length > index + 1) {
        let channelName = words.slice(index + 1).join(" ");
        speak(`Opening YouTube channel ${channelName}`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(channelName)}`, "_blank");
      } else {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
      }
    } else if (command.includes("open google")) {
      speak("Opening Google");
      window.open("https://www.google.com", "_blank");
    } else if (command.includes("open facebook")) {
      speak("Opening Facebook");
      window.open("https://www.facebook.com", "_blank");
    } else if (command.includes("open instagram")) {
      let words = command.split(" ");
      let index = words.indexOf("instagram");

      if (index !== -1 && words.length > index + 1) {
        let profileName = words.slice(index + 1).join(" ");
        speak(`Opening Instagram profile ${profileName}`);
        window.open(`https://www.instagram.com/${profileName}/`, "_blank");
      } else {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
      }
    } else if (command.includes("open whatsapp")) {
      speak("Opening WhatsApp");
      window.open("https://web.whatsapp.com", "_blank");
    } else {
      speak("Searching...");
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(command)}`,
        "_blank"
      );
    }
  }

  // Button click event
  btn.addEventListener("click", function () {
    speak("Listening...");
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    recognition.start();

    // Stop recognition after 8 seconds if no input is received
    setTimeout(() => {
      recognition.stop();
      btn.innerHTML = "Start Listening";
      btn.classList.remove("listening");
    }, 8000); // 8 seconds
  });

  // When a command is recognized
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  // When recognition ends, reset button
  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
  };
}