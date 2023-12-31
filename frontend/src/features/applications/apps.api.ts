import { ApplicationCreate, ApplicationUpdate } from './types';

class AppAPI {
  static async createApp (payload: ApplicationCreate) {
    const response = await fetch('http://localhost:5000/v1/api/apps', {
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

  static async getApps () {
    const response = await fetch('http://localhost:5000/v1/api/apps', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async updateApp (payload: ApplicationUpdate) {
    const response = await fetch(`http://localhost:5000/v1/api/apps/${payload._id}`, {
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

  static async deleteApp (payload: string) {
    const response = await fetch(`http://localhost:5000/v1/api/apps/${payload}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
}

export default AppAPI;
