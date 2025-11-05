import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [resultData, setResultData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);

  // Typing animation helper
  const delayText = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 20 * index); // adjust speed (lower = faster)
  };

  // Main send function
  const onSent = async () => {
    if (!input.trim()) return;

    setRecentPrompt(input);
    setPrevPrompts([...prevPrompts, input]);
    setShowResult(true);
    setLoading(true);
    setResultData("");

    try {
      const response = await runChat(input);

      // Clean markdown-like characters (###, ***, **)
      const cleaned = response
        .replace(/\*\*\*|###|\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/#+/g, "")
        .replace(/\n/g, "<br/>");

      // 🧩 Typing animation — display word by word
      const words = cleaned.split(" ");
      words.forEach((word, i) => delayText(i, word + " "));

    } catch (error) {
      console.error(error);
      setResultData("⚠️ Error fetching response. Try again.");
    } finally {
      // allow animation to finish before hiding loader
      setTimeout(() => setLoading(false), 300);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        prevPrompts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;