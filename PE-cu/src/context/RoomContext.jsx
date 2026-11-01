import { createContext, useContext, useReducer } from 'react';
import { roomReducer, initialRoomState } from '../reducer/roomReducer';
import { roomTypeReducer, initialRoomTypeState } from '../reducer/roomTypeReducer';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, roomDispatch] = useReducer(roomReducer, initialRoomState);
  const [roomTypes, roomTypeDispatch] = useReducer(roomTypeReducer, initialRoomTypeState);

  const value = {
    rooms,
    roomTypes,
    roomDispatch,
    roomTypeDispatch,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => useContext(RoomContext);
