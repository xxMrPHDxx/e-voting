const DEFAULT_HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function REQUEST(method: HttpMethod, path: string, options: RequestInit){
  options['method'] = method;
  return fetch(`/api${path}`, options).then(res=>res.json());
}

export default {
  GET: (path) => REQUEST('GET', path, { headers: DEFAULT_HEADERS }),
  POST: (path, data) => REQUEST('POST', path, { headers: DEFAULT_HEADERS, body: JSON.stringify(data) }),
  PUT: (path, data) => REQUEST('PUT', path, { headers: DEFAULT_HEADERS, body: JSON.stringify(data) }),
  DELETE: (path, data) => REQUEST('DELETE', path, { headers: DEFAULT_HEADERS, body: JSON.stringify(data) }),
}