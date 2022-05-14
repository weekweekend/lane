import { clearObject } from './transform';

function request(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params: Record<string, string | number | null | undefined> = {},
  headers: Record<string, string> = {},
) {
  let oUrl: any;
  url.includes('mock')
    ? (oUrl = new URL(url, window.location.href))
    : (oUrl = new URL(url, 'http://10.1.115.171:8080'));

  if (method === 'GET') {
    Object.entries(clearObject(params)).forEach(([key, value]) => {
      oUrl.searchParams.set(key, value);
    });
    return fetch(oUrl.toString()).then((res) => res.json());
  }
  return fetch(oUrl.toString(), {
    method: method,
    headers: headers,
    body: JSON.stringify(clearObject(params)),
  }).then((res) => res.json());
}
export default request;
