import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Tooltip } from '@mui/material';
import { MdContactSupport } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const ChatbotPanel: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const isMouseInChatbox = useRef(false);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatbox = document.querySelector('.chatbox-container');
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [messages]);    

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMsg = { text: inputValue, sender: 'user' as const };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');

      setTimeout(() => {
        setMessages((prev) => [...prev, { text: 'Hello', sender: 'bot' }]);
      }, 1500);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    if (!isMouseInChatbox.current && !isChatbotOpen) {
      setIsHovered(false);
    }
  };

  const handleChatbotClick = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (isFirstTime && !isChatbotOpen) {
      setMessages([{ text: 'Hello there', sender: 'bot' }]);
      setIsFirstTime(false);
    }
  };

  const handleChatboxMouseEnter = () => {
    isMouseInChatbox.current = true;
  };
  const handleChatboxMouseLeave = () => {
    isMouseInChatbox.current = false;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isChatbotOpen &&
      !panelRef.current?.contains(event.target as Node) &&
      !chatboxRef.current?.contains(event.target as Node)
    ) {
      setIsChatbotOpen(false);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatbotOpen, isHovered]);

  return (
    <>
      <Tooltip title="Query" placement='left' arrow>
        <Box
          ref={panelRef}
          sx={{
            position: 'fixed',
            bottom: '31px',
            right: '0',
            width: isHovered ? '30px' : '6px',
            height: '60px',
            transition: 'width 0.3s ease-in-out',
            background: '#1976d2',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isHovered ? 'space-between' : 'center',
            padding: isHovered ? '0 10px' : '0',
            cursor: isHovered ? 'pointer' : 'default',
            zIndex: 1000,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleChatbotClick}
        >
          {isHovered && (
            <Box sx={{
              marginLeft: 'auto',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MdContactSupport size={35} />
            </Box>
          )}
        </Box>
      </Tooltip>

      {isChatbotOpen && (
        <Box onMouseEnter={handleChatboxMouseEnter} onMouseLeave={handleChatboxMouseLeave}>
          <Box
            ref={chatboxRef}
            sx={{
              position: 'fixed',
              bottom: '103.5px',
              right: '10px',
              width: '300px',
              maxHeight: '400px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: '"Nunito Sans", sans-serif',
              borderBottomRightRadius: '0px',
              fontSize: '14px',
              zIndex: 1001,
            }}
          >
            <Box sx={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, color: '#036ca1', fontFamily: '"Nunito Sans", sans-serif' }}>
                {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} Chat
              </h3>
            </Box>
            <Box
  className="chatbox-container"
  sx={{
    flexGrow: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  }}
>
  {messages.map((msg, index) => (
    <Box
      key={index}
      sx={{
        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
        maxWidth: '80%',
        padding: '6px 10px',
        borderRadius: '10px',
        borderTopRightRadius: msg.sender === 'user' ? '0px' : '10px',
        borderTopLeftRadius: msg.sender === 'bot' ? '0px' : '10px',
        background: msg.sender === 'user' ? '#1976d2' : '#f0f0f0',
        color: msg.sender === 'user' ? 'white' : '#333',
        position: 'relative',
        fontSize: '14px',
      }}
    >
      {msg.text}
    </Box>
  ))}
</Box>

            <Box sx={{ display: 'flex', padding: '10px' }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your query..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.8rem',
                  height: '40px',
                  '& .MuiInputBase-root': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.8rem',
                  },
                }}
              />
              <IoIosSend
                size={30}
                style={{ marginLeft: '10px', marginTop: '2px', marginRight: '5px', cursor: 'pointer', color: '#036ca1' }}
                onClick={handleSendMessage}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatbotPanel;
