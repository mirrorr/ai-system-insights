import { useState } from "react";
import { uploadDocument } from "../../services/api";
import { AppState } from "../../types/appState";
import { s } from "vite/dist/node/types.d-aGj9QkWt";

interface Props {
  setAppState: (state: AppState) => void;
}

export default function FileUpload({ setAppState }: Props) {
  const [fileContent, setFileContent] = useState<string>("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAppState("uploading");

    const text = await file.text();
    setFileContent(text);

    setAppState("processing");

    const source = file.name;
    const result = await uploadDocument(text, source);

    console.log("Ingestion result:", result);

    setAppState("ready");
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" onChange={handleFile} />
      <p className="text-sm mt-2">
        Upload a document to start AI analysis
      </p>
    </div>
  );
}