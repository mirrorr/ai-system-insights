import { useState } from "react";
import FileUpload from "./components/upload/FileUpload";
import ChatWindow from "./components/chat/ChatWindow";
import { AppState } from "./types/appState";
import { Toaster } from "react-hot-toast";


export default function App() {
  const [appState, setAppState] = useState<AppState>("empty");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <Toaster position="top-right" />
      <h1 className="text-xl font-bold">
        AI System Insights Assistant
      </h1>

      <FileUpload setAppState={setAppState} />

      <div className="text-sm text-gray-500">
        Status: {appState}
      </div>

      <ChatWindow appState={appState} />
    </div>
  );
}