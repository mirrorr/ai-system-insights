import { useState } from "react";
import { sendChatMessage } from "../../services/api";
import { AppState } from "../../types/appState";
import toast from "react-hot-toast";


interface Message {
    role: "user" | "assistant";
    content: string;
}

interface Props {
    appState: AppState;
}

export default function ChatWindow({ appState }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [mode, setMode] = useState<"strict" | "creative">("strict");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            const res = await sendChatMessage(input, mode);
            const aiMsg: Message = {
                role: "assistant",
                content: res.answer,
            };
            setMessages((prev) => [...prev, aiMsg]);

        } catch (error) {
            toast.error(error.message || "Something went wrong");
            console.error('Error occurred while sending chat message:', error);
        }
    };

    return (
        <div className="p-4 border rounded h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {messages.map((m, i) => (
                    <div key={i} className="mb-2">
                        <b>{m.role}:</b> {m.content}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border flex-1 p-2"
                    disabled={appState !== "ready"}
                    placeholder={
                        appState !== "ready"
                            ? "Upload document first..."
                            : "Ask something..."
                    }
                />
                <div className="flex items-center gap-2">
                    <span className="text-sm">Strict</span>

                    <button
                        onClick={() =>
                            setMode(mode === "strict" ? "creative" : "strict")
                        }
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${mode === "creative" ? "bg-blue-500" : "bg-gray-400"
                            }`}
                    >
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${mode === "creative" ? "translate-x-6" : "translate-x-0"
                                }`}
                        />
                    </button>

                    <span className="text-sm">Creative</span>
                </div>

                <button
                    onClick={sendMessage}
                    disabled={appState !== "ready"}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    Send
                </button>
            </div>
        </div>
    );
}