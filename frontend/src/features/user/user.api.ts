import { NewUser } from './types';

interface UpdateProps {
  _id: string,
  email: string,
}

class UserAPI {
  static async register (payload: NewUser) {
    const response = await fetch('http://localhost:5000/v1/api/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async login (payload: NewUser) {
    const response = await fetch('http://localhost:5000/v1/api/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async updateUser (payload: UpdateProps) {
    const response = await fetch(`http://localhost:5000/v1/api/users/${payload._id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async deleteUser (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/users/${payload}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async logout () {
    const response = await fetch('http://localhost:5000/v1/api/users/logout', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
}

export default UserAPI;
