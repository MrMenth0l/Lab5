const BASE_URL = 'https://dummyjson.com/posts';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
}

export async function getPosts() {
  const response = await fetch(`${BASE_URL}`);
  return handleResponse(response);
}

export async function searchPostsByText(text) {
  const query = encodeURIComponent(text.trim());
  const response = await fetch(`${BASE_URL}/search?q=${query}`);
  return handleResponse(response);
}

export async function createPost(postData) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  return handleResponse(response);
}