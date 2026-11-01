export const initialRoomTypeState = [];

export function roomTypeReducer(state, action) {
  switch (action.type) {
    case 'SET_ROOM_TYPES':
      return action.payload;
    case 'ADD_ROOM_TYPE':
      return [...state, action.payload];
    case 'DELETE_ROOM_TYPE':
      return state.filter((roomType) => Number(roomType.id) !== Number(action.payload));
    default:
      return state;
  }
}
