import { NewTag } from './types';

class TagsAPI {
  static async createTags (payload: NewTag[]) {
    const response = await fetch('http://localhost:5000/v1/api/tags', {
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

  static async getTags () {
    const response = await fetch('http://localhost:5000/v1/api/tags/', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async deleteTag (payload: string) {
    const response = await fetch(`http://localhost:5000/v1/api/tags/${payload}`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
}

export default TagsAPI;
