function appendCharacter(char) {
  let display = document.getElementById("display");
  if (display.value === "0") {
    display.value = char;
  } else {
    display.value += char;
  }
}

function clearDisplay() {
  document.getElementById("display").value = "0";
}

function backspace() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
  if (display.value === "") display.value = "0";
}

function calculate() {
  let display = document.getElementById("display");
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
