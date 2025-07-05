import { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from "react-markdown";

const Answer = ({ ans, index, totalResult }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAns] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAns(replaceHeading(answer));
    }
  }, []);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          style={dark}
          preTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div>
      {index == 0 && totalResult > 1 ? (
        <span className="pt-2 text-xl block dark:text-zinc-200 text-zinc-800">
          {answer}
        </span>
      ) : heading ? (
        <span className="pt-2 text-xl block dark:text-white text-zinc-800 font-bold">
          {answer}
        </span>
      ) : (
        <span className="pt-2 text-lg block dark:text-zinc-200 text-zinc-800">
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
      )}
    </div>
  );
};

export default Answer;
