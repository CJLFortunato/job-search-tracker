interface UpdateProps {
  _id: string,
  email: string,
}

class UserAPI {
  static async register (payload: any) {
    const response = await fetch('http://localhost:5000/v1/api/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async login (payload: any) {
    const response = await fetch('http://localhost:5000/v1/api/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async updateUser (payload: UpdateProps) {
    console.log(payload);
    console.log(payload._id);
    console.log(`http://localhost:5000/v1/api/users/${payload._id}`);
    const response = await fetch(`http://localhost:5000/v1/api/users/${payload._id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': '*',
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
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async logout () {
    const response = await fetch('http://localhost:5000/v1/api/users/logout', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
}

export default UserAPI;
