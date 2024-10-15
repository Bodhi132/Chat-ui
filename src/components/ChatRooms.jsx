import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRoom } from '../features/chat/chatSlice'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CgProfile } from "react-icons/cg";

const ChatRooms = () => {

  const dispatch = useDispatch()
  const rooms = useSelector(state => state.chat.rooms)
  const currentRoom = useSelector(state => state.chat.currentRoom)

  const handleRoomChange = (room) => {
    dispatch(setCurrentRoom(room));
  };

  return (
    <List component="nav">
      {Object.keys(rooms).map((room) => (
        <ListItemButton
          button
          key={room}
          selected={room === currentRoom}
          onClick={() => handleRoomChange(room)}
        >
          <ListItemIcon>
            <CgProfile />
          </ListItemIcon>
          <ListItemText primary={room} />
        </ListItemButton>
      ))}
    </List>
  );

}

export default ChatRooms