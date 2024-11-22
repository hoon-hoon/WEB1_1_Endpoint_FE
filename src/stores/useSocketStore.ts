import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketStore {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

const SOCKET_SERVER_URL = 'http://your-backend-server.com';

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connect: () => {
    const socket = io(SOCKET_SERVER_URL);
    set({ socket });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      set({ socket: null });
    });
  },
  disconnect: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));
