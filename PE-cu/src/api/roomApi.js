const API_BASE = 'http://localhost:3001';

export const fetchRooms = async () => {
  const response = await fetch(`${API_BASE}/rooms`);
  if (!response.ok) {
    throw new Error('Failed to fetch rooms.');
  }
  return response.json();
};

export const fetchRoomById = async (id) => {
  const rooms = await fetchRooms();
  const room = rooms.find((item) => String(item.id) === String(id));
  if (!room) {
    throw new Error('Room not found.');
  }
  return room;
};

export const fetchRoomTypes = async () => {
  const response = await fetch(`${API_BASE}/roomTypes`);
  if (!response.ok) {
    throw new Error('Failed to fetch room types.');
  }
  return response.json();
};

export const addRoom = async (payload) => {
  const response = await fetch(`${API_BASE}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to add room.');
  }
  return response.json();
};

export const deleteRoom = async (id) => {
  const response = await fetch(`${API_BASE}/rooms/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete room.');
  }
  return response.json();
};

export const deleteRoomType = async (id) => {
  const response = await fetch(`${API_BASE}/roomTypes/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete room type.');
  }
  return response.json();
};
