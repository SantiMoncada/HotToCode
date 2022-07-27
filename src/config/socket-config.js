import { io } from 'socket.io-client'

const URL = process.env.BACK_END_URL
const socket = io('http://192.168.169.101:5005', { autoConnect: false })

export default socket;
