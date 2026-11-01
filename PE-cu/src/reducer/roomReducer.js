export const initialRoomState = [];

export function roomReducer(state, action) {
  switch (action.type) {
    case 'SET_ROOMS':
      return action.payload;
    case 'ADD_ROOM':
      return [...state, action.payload];
    case 'DELETE_ROOM':
      return state.filter((room) => Number(room.id) !== Number(action.payload));
    default:
      return state;
  }
}
