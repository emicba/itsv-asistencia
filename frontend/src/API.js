export default {
  async login(username, password) {
    const response = await fetch('http://localhost:8000/auth/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const error = new Error(
      data.message || 'Unable to log in with provided credentials.',
    );
    throw error;
  },
};
