const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Set the initial text from the textarea
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  // Fetch available voices from the browser
  voices = speechSynthesis.getVoices();
  
  // Create HTML options for each voice
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  // Find the voice object that matches the user's selection
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  // Stop any current speech
  speechSynthesis.cancel();
  
  // If startOver is true and there is text, start speaking
  if (startOver && msg.text.trim().length > 0) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  // Dynamically update rate, pitch, or text based on input name
  msg[this.name] = this.value;
  toggle();
}

// The 'voiceschanged' event is crucial because voices load asynchronously
speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);

// Stop button calls toggle with false to prevent restarting
stopButton.addEventListener('click', () => toggle(false));