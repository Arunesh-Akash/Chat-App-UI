import { useState } from "react";
import '../ChatInputComponent/ChatInput.css';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  }

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" placeholder="Type Message Here" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button type="submit" className="send-button">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
