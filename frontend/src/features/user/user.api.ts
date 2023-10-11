class UserAPI {
  static async register (payload: any) {
    const response = await fetch('http://localhost:5000/v1/api/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
      },
    });
    const data = await response.json();
    return data;
  }

  static async login (payload: any) {
    const response = await fetch('http://localhost:5000/v1/api/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
      },
    });
    const data = await response.json();
    return data;
  }

  static async getUser (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/users/${payload}`);
    const data = await response.json();
    return data;
  }

  static async updateUser (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/users/${payload}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
      },
    });
    const data = await response.json();
    return data;
  }

  static async deleteUser (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/users/${payload}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
}

export default UserAPI;
