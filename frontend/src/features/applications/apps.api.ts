class AppAPI {
  static async createApp (payload: any) {
    const response = await fetch('http://localhost:5000/v1/api/apps/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await response.json();
    return data;
  }

  static async getApps () {
    const response = await fetch('http://localhost:5000/v1/api/apps');
    const data = await response.json();
    return data;
  }

  static async updateApp (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/apps/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'Application/JSON',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const data = await response.json();
    return data;
  }

  static async deleteApp (payload: any) {
    const response = await fetch(`http://localhost:5000/v1/api/apps/${payload.id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
}

export default AppAPI;
