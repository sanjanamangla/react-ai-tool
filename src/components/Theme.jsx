const Theme = ({setDarkMode}) => {
  return (
    <>
      <select
        onChange={(e) => setDarkMode(e.target.value)}
        className="fixed dark:text-white text-zinc-800 bottom-0 p-5 font-bold"
      >
        <option className="dark:bg-zinc-900 bg-zinc-200 font-bold" value="dark">
          Dark
        </option>
        <option
          className="dark:bg-zinc-900 bg-zinc-200 font-bold"
          value="light"
        >
          Light
        </option>
      </select>
    </>
  );
};

export default Theme
