import { useState } from "react";
import { gptApi } from "../helpers/apiGpt";

function useGptChat() {
  const [history, setHistory] = useState([
    { role: "system", content: "You are a helpful assistant." }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parsedUserData, setParsedUserData] = useState(null);
  const [lastIntent, setLastIntent] = useState(null);

  const sendMessage = async (message) => {
    const updatedHistory = [...history, { role: "user", content: message }];
    setLoading(true);
    setError(null);

    try {
      // חיפוש ביוגרפיה ישנה אם קיימת
      const userBioMessage = history.find(
        m => m.role === "user" && m.content.includes("בן 32")
      )?.content;

      const enrichedMessage =
        message.includes("תחלץ") && userBioMessage
          ? userBioMessage + "\n\n" + message
          : message;

      // שלב זיהוי כוונה
      const intentRes = await gptApi({
        url: "/api/gpt/detect-intent",
        method: "POST",
        body: { message: enrichedMessage }
      });

      const intent = intentRes.intent;
      setLastIntent(intent); // ← עכשיו במקום הנכון

      let gptRes;

      if (intent === "parse-user") {
        gptRes = await gptApi({
          url: "/api/gpt/parse-user",
          method: "POST",
          body: { message: enrichedMessage }
        });
        setParsedUserData(gptRes);
      } else if (intent === "analyze-user") {
        gptRes = await gptApi({
          url: "/api/gpt/analyze-user",
          method: "POST",
          body: { message }
        });
        setParsedUserData(null);
      } else {
        gptRes = await gptApi({
          url: "/api/gpt/chat",
          method: "POST",
          body: { history: updatedHistory }
        });
        setParsedUserData(null);
      }

      const assistantMessage =
        gptRes.response || JSON.stringify(gptRes, null, 2);

      const newHistory = [
        ...updatedHistory,
        { role: "assistant", content: assistantMessage }
      ];
      setHistory(newHistory);

      return { text: assistantMessage, intent, data: gptRes };
    } catch (err) {
      console.error("GPT error:", err);
      setError(err);
      setHistory([
        ...updatedHistory,
        {
          role: "assistant",
          content: "⚠️ שגיאה: העוזר לא מגיב כרגע. נסה שוב."
        }
      ]);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    history: history.filter((msg) => msg.role !== "system"),
    sendMessage,
    loading,
    error,
    lastIntent,
    parsedUserData
  };
}

export default useGptChat;
