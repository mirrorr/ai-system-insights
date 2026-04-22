import MainLayout from './components/layout/MainLayout';
import ChatWindow from './components/chat/ChatWindow';
import FileUpload from './components/upload/FileUpload';

function App() {
  return (
    <MainLayout>
      <div className="app-shell">
        <FileUpload />
        <ChatWindow />
      </div>
    </MainLayout>
  );
}

export default App;
