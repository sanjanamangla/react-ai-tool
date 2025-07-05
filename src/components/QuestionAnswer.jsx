import Answer from "./Answers";
const QuestionAnswer = ({item, index}) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type === "q" ? (
          <li className="text-right p-1 border-5 dark:bg-zinc-700 bg-zinc-200 dark:border-zinc-700 border-zinc-200 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit">
            <Answer totalResult={1} ans={item.text} index={index} />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li key={ansIndex} className="text-left p-1">
              <Answer
                totalResult={ansItem.length}
                ans={ansItem}
                index={ansIndex}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
