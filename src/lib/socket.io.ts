import { io } from 'socket.io-client'

export const socket = io('http://localhost:3001') // Substitua SEU_PORTA_DO_BACKEND pela porta do seu servidor backend
