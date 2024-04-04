import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import RoundedBtn from "./Common/RoundedBtn";
import { messagesData } from "../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { cs1, cs2 } from "../assets/whatsapp";
import { getTime } from "../logic/whatsapp";
import { chatbot } from "../logic/chatbot";
const palabras = ["Hola", "🧾 Consultar resultados", "RSV816378351", "Verificado", "PDF Resultados", "SEND Resultados", "Sí, por favor", "correo@gmail.com"];
function ChatDetail() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(messagesData);
  const [typing, setTyping] = useState(false);
  const [word, setWord] = useState(false);
  const [currentMessage, setCurrentMessage] = useState([]);

  const myCase = "A";
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const bottomRef = useRef(null);
  // Functions
  const handleInputChangeTwo = (event) => {
    setInputValue(event.target.value);
  };
  const addMessage = (msg) => {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  };

  const addCurrentMessage = (current) => {
    const newCurrentMessage = [...currentMessage, current];
    setCurrentMessage(newCurrentMessage);
  };

  const handleEmojiClick = () => {
    inputRef.current.value += "🔥";
    inputRef.current.focus();
  };

  const handleImgUpload = () => {
    addMessage({
      img: cs2,
      time: getTime(),
      sent: true,
    });
  };

  const handleInputChange = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };
  const handleInputChange2 = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const handleInputSubmit = () => {
    if (inputRef.current.value.length > 0) {
      addMessage({
        msg: inputRef.current.value,
        time: getTime(),
        isLink: false,
        sent: true,
        Image: null,
        options: null,
      });
      addCurrentMessage(inputRef.current.value);
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    }

  };

  const updateInputValue = (data) => {
    inputRef.current.value = data;
    inputRef.current.focus();
  }

  function enviar() {
    
    switch (inputValue) {
      case "1":
        setCurrentMessage([...currentMessage, "Verificado"]);
        const response = chatbot("Verificado", myCase);
        addMessage(response);
        break;
      case "2":
        setCurrentMessage([...currentMessage, "PDF Resultados"]);
        const response2 = chatbot("PDF Resultados", myCase);
        addMessage(response2);
        break;
      case "3":
        setCurrentMessage([...currentMessage, "IMG Resultados"]);
        const response3 = chatbot("IMG Resultados", myCase);
        addMessage(response3);
        break;
      case "4":
        setCurrentMessage([...currentMessage, "SEND Resultados"]);
        const response4 = chatbot("SEND Resultados", myCase);
        addMessage(response4);
        break;
      default:
        break;
    }
  }
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") handleInputSubmit();
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });
  // cada 3 segudos verificar si currentMessage tiene un valor y si es asi
  // agregar un mensaje de respuesta a la lista de mensajes
  useEffect(() => {
    const id = setInterval(() => {
      if (currentMessage.length > 0) {
        const response = chatbot(currentMessage[currentMessage.length - 1], myCase);
        addMessage(response);
      }
    }, 1000);
    if (currentMessage[currentMessage.length - 1] === "RSV816378351") {
      setWord(true);
    }
    return () => clearInterval(id);
  }, [currentMessage]);


  return (
    // ChatDetail main container
    <div className="flex flex-col h-screen">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <img
            src={cs1}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">Salud Digna</h1>

            {/* Status */}
            <p className="text-[#8796a1] text-xs">En Linea</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" }}
      >
        {messages.map((msg, index) => (
          <Message
            key={index}
            msg={msg.msg}
            time={msg.time}
            isLink={msg.isLink}
            img={msg.img}
            sent={msg.sent}
            options={msg.options}
            sendOptionText={updateInputValue}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />

        {/* Upload btn */}
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
        </span>

        {/* Input bar */}
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          onChange={handleInputChange}
          ref={inputRef}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ChatDetail;

function enviar(inputValue){
  
};