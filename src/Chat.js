import React, { useState } from "react";
import "./Chat.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  console.log(messages);

  const sendMessage = async (e) => {
      e.preventDefault();
      axios.post('/messages/new', {
        
            "message":input,
            "name":"Himel",
            "timestamp":"20/20/20",
            "recieved":true
        
      })
      setInput('')
  };

  return (
    <div className="chat">
      <div className="div chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.recieved && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{new Date().toDateString()}</span>
          </p>
        ))}

        <p className="chat_message chat_receiver ">
          <span className="chat_name">Riduan</span>
          This is a message
          <span className="chat_timestamp">{new Date().toDateString()}</span>
        </p>
        <p className="chat_message ">
          <span className="chat_name">Riduan</span>
          This is a message
          <span className="chat_timestamp">{new Date().toDateString()}</span>
        </p>
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
