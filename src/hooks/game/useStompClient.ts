import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BROKER_URL = BACKEND_URL + '/ws';

export const useStompClient = () => {
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: BROKER_URL,
      onConnect: () => console.log('STOMP 연결 성공'),
      onStompError: (frame) => console.error('STOMP 오류:', frame),
    });

    client.activate();
    //clientRef.current = client;

    return () => {
      client.deactivate();
      console.log('STOMP 연결 종료');
    };
  }, [BROKER_URL]);

  return clientRef;
};
