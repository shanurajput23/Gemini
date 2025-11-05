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

  // 🕓 Typing animation helper
  const delayText = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 20 * index); // lower = faster
  };

  // 🧠 Main send function (supports both input + direct prompts)
  const onSent = async (promptText) => {
    const finalPrompt = promptText || input; // use parameter if given (for cards)
    if (!finalPrompt.trim()) return;

    setRecentPrompt(finalPrompt);
    setPrevPrompts((prev) => [...prev, finalPrompt]);
    setShowResult(true);
    setLoading(true);
    setResultData("");

    try {
      const response = await runChat(finalPrompt);

      // 🧹 Clean up markdown-like syntax
      const cleaned = response
        .replace(/\*\*\*|###|\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/#+/g, "")
        .replace(/\n/g, "<br/>");

      // 🧩 Typing animation
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