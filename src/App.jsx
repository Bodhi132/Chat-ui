import ChatRooms from './components/ChatRooms'
import Chat from './components/Chat'

import { Box } from '@mui/material'


function App() {

  return (
    <Box display="flex" sx={{height:'100vh'}}>
      <Box flex="1" maxWidth={200} bgcolor="#f5f5f5">
        <ChatRooms />
      </Box>
      <Box flex="3" sx={{height:'100%'}}>
        <Chat />
      </Box>
    </Box>
  )
  
}

export default App
