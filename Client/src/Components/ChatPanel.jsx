import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! Ask me for a book recommendation." },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const next = [...messages, { role: "user", text: input }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...next, { role: "ai", text: data.reply }]);
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-7 right-7 w-14 h-14 rounded-full bg-[#D8472F]
                   shadow-[0_10px_24px_-8px_rgba(216,71,47,0.55)] flex items-center justify-center hover:scale-105 transition-transform z-50"
      >
        {open ? <X size={22} className="text-[#FFFBF3]" /> : <Sparkles size={22} className="text-[#FFFBF3]" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-7 w-80 h-[26rem] bg-[#FFFBF3] border border-[#E2D5BC] rounded-2xl
                        shadow-[0_20px_40px_-20px_rgba(30,42,66,0.35)] flex flex-col z-[100] overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1E2A42] border-b border-[#D8472F]/30">
            <Sparkles size={16} className="text-[#D8472F]" />
            <span className="text-sm font-semibold text-[#FFFBF3]">RetroRead Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-snug ${
                  m.role === "user"
                    ? "ml-auto bg-[#D8472F] text-[#FFFBF3]"
                    : "mr-auto bg-[#F6EFE3] border border-[#E2D5BC] text-[#1E2A42]"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-[#F6EFE3] border border-[#E2D5BC] text-[#8A7F6B] text-xs px-3 py-2 rounded-xl">
                Thinking…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#E2D5BC] bg-[#FFFBF3]">
            <div className="flex items-center gap-2 rounded-full border border-[#D9C7A3] bg-white px-3 py-2 focus-within:border-[#D8472F] focus-within:ring-2 focus-within:ring-[#D8472F]/20 transition-colors">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask for a recommendation..."
                className="flex-1 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="shrink-0 w-8 h-8 rounded-full bg-[#D8472F] disabled:bg-[#D9C7A3] flex items-center justify-center transition-colors"
              >
                <Send size={14} className="text-[#FFFBF3]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}