export const loginUser = async ({ username, password }) => {
  const response = await fetch('http://localhost:3001/users');
  if (!response.ok) {
    throw new Error('Unable to connect to authentication server.');
  }

  const users = await response.json();
  const matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!matchedUser) {
    throw new Error('Invalid username or password.');
  }

  if (matchedUser.role !== 'Admin') {
    throw new Error('Access denied. Only Admin users can log in.');
  }

  return matchedUser;
};
