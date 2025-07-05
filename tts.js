export const speakText = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // You can set language
    utterance.rate = 1; // Speed (0.1 - 10)
    utterance.pitch = 1; // Pitch (0 - 2)
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Text-to-speech not supported in this browser.");
  }
};
