const InputField=({question, isEnter, setQuestion, askQuestion})=>{
    return(
        <>
        <div className="dark:bg-zinc-800 bg-zinc-200 w-[70%] md:w-1/2 h-16 dark:text-white text-zinc-900 m-auto p-1 pr-5 rounded-4xl border border-zinc-700 flex">
            <input
              className="w-full h-full p-3 outline-none"
              type="text"
              value={question}
              onKeyDown={isEnter}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask me anything"
            />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </>
    )
}

export default InputField