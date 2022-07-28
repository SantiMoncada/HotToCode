import { io } from 'socket.io-client'

const URL = process.env.REACT_APP_BACK_END_URL
const socket = io(URL || 'http://localhost:5005', { autoConnect: false })

export default socket;
