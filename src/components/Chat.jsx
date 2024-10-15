import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, receiveMessage, addLoader } from '../features/chat/chatSlice'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IoMdSend } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import backgroundImage from '../assets/chat-background.jpg'


const Chat = () => {

  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chat.rooms[state.chat.currentRoom])
  const currentRoom = useSelector(state => state.chat.currentRoom)
  const messagesEndRef = useRef(null)

  const handleSend = () => {
    if (input.trim() !== '') {
      dispatch(sendMessage(input));
      dispatch(addLoader());
      setTimeout(() => {
        dispatch(receiveMessage());
      }, 3000); // 3 seconds delay
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100%', position: 'relative' }}>
      <div className='flex gap-3 text-2xl items-center' style={{ color: 'white', padding: '10px', backgroundColor: 'rgba(0,0,0,0.5)', margin: 0 }}>
        <CgProfile />
        <h1 >
          {currentRoom}
        </h1>
      </div>
      <Stack spacing={2} direction="column" sx={{ flex: 1, overflowY: 'auto', paddingBottom: '60px' }} >
        {messages.map((message, index) => (
          <Paper key={index} variant="outlined" p={2} sx={{ backgroundColor: 'transparent', border: 'none' }}>
            <Box display="flex" flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'} sx={{ backgroundColor: 'transparent' }} p={3}>
              <Box bgcolor={message.sender === 'user' ? 'primary.main' : 'grey.300'} p={2} borderRadius={2}>
                <div style={{ fontSize: '1em', textAlign: message.sender === 'user' ? 'right' : 'left' }}>{message.text}</div>
                <div style={{ fontSize: '0.7em' }}>
                  {message.timestamp}
                </div>
              </Box>
            </Box>
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
      <Box display="flex" py={2} px={5} sx={{ alignItems: 'flex-end', position: 'absolute', bottom: 0, width: '100%' }}>
        <Box sx={{ width: '100%', position: 'relative' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            style={{ width: '100%', paddingRight: '40px', background: 'transparent', border: '2px solid black', borderRadius: '5px', padding: '5px', backgroundColor: 'white' }} // Add padding to the right to make space for the button
          />
          <button
            onClick={handleSend}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <IoMdSend />
          </button>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat