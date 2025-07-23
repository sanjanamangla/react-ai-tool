import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";
import Theme from "./components/Theme";
import Loader from "./components/Loader";
import InputField from "./components/InputField";
import Speech from "./components/Speech";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const [loader, setLoader] = useState(false);
  const scrollToAns = useRef();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false;
    }
    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = history.slice(0, 19);
        history = [question, ...history];
        history = history.map((item) => {
          const trimmed = item.trim();
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        });
        history = [...new Set(history)];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }
    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloadData,
            },
          ],
        },
      ],
    };
    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "ans", text: dataString },
    ]);
    setQuestion("");
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const isEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    askQuestion();
  }, [selectedHistory]);

  //dark mode feature
  const [darkMode, setDarkMode] = useState("dark");
  useEffect(() => {
    if (darkMode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleEnd = () => setIsSpeaking(false);
    window.speechSynthesis.addEventListener("end", handleEnd);
    return () => {
      window.speechSynthesis.removeEventListener("end", handleEnd);
    };
  }, []);

  return (
    <div className={darkMode == "dark" ? "dark" : "light"}>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden p-1 fixed top-4 left-4 z-50 bg-zinc-400 rounded shadow"
      >
        ☰
      </button>
      {showSidebar && (
        <div className="fixed z-40 w-64 h-full bg-zinc-200 dark:bg-zinc-800">
          <Theme setDarkMode={setDarkMode} />
          <RecentSearch
            clearHistory={clearHistory}
            recentHistory={recentHistory}
            setSelectedHistory={(item) => {
              setSelectedHistory(item);
              setShowSidebar(false);
            }}
            setRecentHistory={setRecentHistory}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 text-center">
         <Theme hideOnMobile={true} setDarkMode={setDarkMode} />
        <div className="hidden md:block col-span-1">
          <RecentSearch
            clearHistory={clearHistory}
            recentHistory={recentHistory}
            setSelectedHistory={setSelectedHistory}
            setRecentHistory={setRecentHistory}
          />
        </div>
        <div className="col-span-1 md:col-span-4 h-screen px-4 pt-12 md:p-10">
          <div className="relative w-full mt-4">
            <h1 className="text-3xl md:text-4xl leading-relaxed text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
              Hello User, Ask me Anything
            </h1>
            <Speech
              isSpeaking={isSpeaking}
              result={result}
              setIsSpeaking={setIsSpeaking}
            />
          </div>
          <Loader loader={loader} />
          <div ref={scrollToAns} className="container h-120 overflow-y-scroll">
            <div className="text-zinc-300 pr-4">
              <ul>
                {result.map((item, index) => {
                  return (
                    <QuestionAnswer key={index} item={item} index={index} />
                  );
                })}
              </ul>
            </div>
          </div>
          <InputField
            question={question}
            isEnter={isEnter}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
