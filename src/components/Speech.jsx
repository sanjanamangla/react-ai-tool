import { speakText } from "../../tts";
const Speech=({setIsSpeaking, isSpeaking, result})=>{
    return(
        <>
        <button
              onClick={() => {
                const lastAnswerObj = [...result]
                  .reverse()
                  .find((item) => item.type === "ans");

                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                } else {
                  if (lastAnswerObj?.text?.length) {
                    speakText(lastAnswerObj.text.join(". "));
                    setIsSpeaking(true);
                  } else {
                    speakText("No answer available yet.");
                    setIsSpeaking(true);
                  }
                }
              }}
              title={isSpeaking ? "Mute" : "Speak last answer"}
              className="hidden md:absolute md:right-6 md:top-[28%] md:block translate-x-2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-blue-600 text-blue-500 hover:text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:scale-110"
            >
              {isSpeaking ? (
                // 🔇 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l-5 5H1v4h3l5 5V5zm7 4l4 4m0-4l-4 4"
                  />
                </svg>
              ) : (
                // 🔊 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5l-4 4H5v6h2l4 4V5zm6.5 3.5a6.5 6.5 0 010 9M17.5 8.5a4.5 4.5 0 010 7"
                  />
                </svg>
              )}
            </button>
        </>
    )
}

export default Speech