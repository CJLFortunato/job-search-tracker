class AppAPI {
  static async createApp (payload: any) {
    const response = await fetch('http://localhost:5000/v1/api/apps', {
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

  static async getApps () {
    const response = await fetch('http://localhost:5000/v1/api/apps', {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async updateApp (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/apps/${payload._id}`, {
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

  static async deleteApp (payload: string) {
    const response = await fetch(`http://localhost:5000/v1/api/apps/${payload}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
}

export default AppAPI;
