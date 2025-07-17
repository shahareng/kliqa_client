import { useState } from "react";
import useGptChat from "../../../hooks/useGptChat";
import style from "./style.module.css";
import { MessageCircle } from "lucide-react";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";

function GPTAssistant() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { history, sendMessage, loading, error, parsedUserData, lastIntent } = useGptChat();
  const [showParsedPreview, setShowParsedPreview] = useState(true);

  console.log("🔄 lastIntent:", lastIntent);
  console.log("📦 parsedUserData:", parsedUserData);
  console.log("💬 message:", message);
  console.log("📜 history:", history);

  
  useEffect(() => {
    if (parsedUserData && lastIntent === "parse-user") {
      setShowParsedPreview(true);
    }
  }, [parsedUserData, lastIntent]);
  const {
    
    callApi: saveUser,
  } = useApi(`/users/add`, "POST", parsedUserData);

  const handleSend = async () => {
    if (!message.trim()) return;
    console.log("📤 Sending message:", message);
    await sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCreateUser = async () => {
    if (!parsedUserData) return;
    console.log("🚀 Creating user with data:", parsedUserData);
    try {
      const res = await saveUser();
      console.log("הנתונים נשמרו בהצלחה", res);
    } catch (err) {
      console.error("update error", err);
    }
    
  };

  return (
    <>
      {}
      <button className={style.floatingButton} onClick={() => setIsOpen(!isOpen)}>
        <MessageCircle size={24} />
      </button>

      {}
      {isOpen && (
        <div className={style.chatContainer}>
          <div className={style.chatHeader}>
            <span>🤖 העוזר החכם</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className={style.chatBox}>
            {history.map((msg, index) => (
              <div
                key={index}
                className={`${style.bubble} ${msg.role === "user" ? style.user : style.assistant}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className={style.bubble + " " + style.assistant}>...</div>
            )}
          </div>

          {parsedUserData && lastIntent === "parse-user" && showParsedPreview && (
            <div className={style.userPreview}>
              <div style={{ maxHeight: "200px", overflow: "auto", direction: "ltr" }}>
                <pre>{JSON.stringify(parsedUserData, null, 2)}</pre>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                <button onClick={handleCreateUser}>✔ הוסף למערכת</button>
                <button onClick={() => setShowParsedPreview(false)}>❌ סגור</button>
              </div>    
            </div>

          )}


          <div className={style.inputArea}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="כתוב לי משהו..."
              rows={2}
            />
            <div style={{ fontSize: "12px", color: "gray", padding: "0.5rem" }}>
              intent: {lastIntent}
            </div>

            <button onClick={handleSend} disabled={loading}>
              שלח
            </button>
          </div>

          {error && <div className={style.error}>שגיאה: {error.message}</div>}
        </div>
      )}
    </>
  );
}

export default GPTAssistant;
