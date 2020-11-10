const headers = () => ({
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Token ${localStorage.getItem('itsv-asistencia-token')}`,
  },
});

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
  async fetch(path) {
    const response = await fetch(`http://localhost:8000/${path}`, {
      ...headers(),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message || 'Unable to fetch.');
    throw error;
  },
  students: {
    async add(data) {
      const response = await fetch(`http://localhost:8000/students/`, {
        method: 'POST',
        ...headers(),
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return;
      }
      const error = new Error('Unable to add student.');
      throw error;
    },
    async delete(id) {
      const response = await fetch(`http://localhost:8000/students/${id}`, {
        method: 'DELETE',
        ...headers(),
      });
      if (response.ok) {
        return;
      }
      const error = new Error('Unable to remove student.');
      throw error;
    },
    async update(id, data) {
      const response = await fetch(`http://localhost:8000/students/${id}/`, {
        method: 'PUT',
        ...headers(),
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return;
      }
      const error = new Error('Unable to update student.');
      throw error;
    },
  },
  attendace: {
    async post(data) {
      const response = await fetch(`http://localhost:8000/attendances/`, {
        method: 'POST',
        ...headers(),
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return;
      }
      const error = new Error('Unable to take attendance.');
      throw error;
    },
  },
  subjects: {
    async create(data) {
      const response = await fetch(`http://localhost:8000/subjects/`, {
        method: 'POST',
        ...headers(),
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
      const error = new Error('Unable to add subject.');
      throw error;
    },
    async addTeacher(subjectId, username) {
      const response = await fetch(
        `http://localhost:8000/subjects/${subjectId}/`,
        {
          method: 'PATCH',
          ...headers(),
          body: JSON.stringify({
            op: 'add',
            path: 'teachers',
            value: {
              username,
            },
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        return;
      }
      const error = new Error(data.message || 'Unable to add teacher.');
      throw error;
    },
    async delete(id) {
      const response = await fetch(`http://localhost:8000/subjects/${id}`, {
        method: 'DELETE',
        ...headers(),
      });
      if (response.ok) {
        return;
      }
      const error = new Error('Unable to remove subject.');
      throw error;
    },
  },
};
