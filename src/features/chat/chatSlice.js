import { createSlice, current } from "@reduxjs/toolkit";

const senders = {
    Alice: [],
    Bob: [],
    Charlie: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        rooms: senders,
        currentRoom: "Alice"
    },
    reducers: {
        setCurrentRoom: (state, action) => {
            state.currentRoom = action.payload;
        },
        sendMessage: (state, action) => {
            state.rooms[state.currentRoom].push({
                text: action.payload,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            });
        },
        receiveMessage: (state, action) => {
            // Find the last message with the loader
            const lastMessageIndex = state.rooms[state.currentRoom].findIndex(msg => msg.text === 'typing...');
            if (lastMessageIndex !== -1) {
                // Replace the loader with the actual message
                state.rooms[state.currentRoom][lastMessageIndex] = {
                    text: 'Replied',
                    sender: state.currentRoom,
                    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                };
            }
        },
        addLoader: (state) => {
            state.rooms[state.currentRoom].push({
                text: 'typing...',
                sender: state.currentRoom,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            });
        }
    }
});

export const { setCurrentRoom, sendMessage, receiveMessage, addLoader } = chatSlice.actions;
export default chatSlice.reducer;