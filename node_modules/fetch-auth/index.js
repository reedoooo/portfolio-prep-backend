// authorise a user using the Authorization headers on any URI and return the JSON value of
// its response
export default async function fetchAuth(uri, Authorization, options={}, headers={}) {
  const res = await fetch(uri, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      Authorization
    }
  });

  if (res.status >= 200 && res.status < 300) {
    try {
      return await res.json();
    } catch(err) {
      const error = new Error('Invalid JSON');
      error.caught = err;
      error.response = res;
      throw error;
    }
  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}
