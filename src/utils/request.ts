import { clearObject } from './transform';

function request(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params: Record<string, string | number | null | undefined> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
) {
  const token = localStorage.getItem('token') || '';
  // if (!token) {
  //   window.location.href = '#/signIn';
  //   console.log('请登录');
  //   return;
  // }
  let oUrl: any;
  url.includes('mock')
    ? (oUrl = new URL(url, window.location.href))
    : (oUrl = new URL(url, 'http://192.168.2.36:8080/'));

  if (method === 'GET') {
    Object.entries(clearObject(params)).forEach(([key, value]) => {
      oUrl.searchParams.set(key, value);
    });
    return fetch(oUrl.toString(), {
      credentials: 'include',
      mode: 'cors',
      headers: clearObject(Object.assign({ Authorization: token }, headers)),
    }).then((res) => res.json());
  }
  return fetch(oUrl.toString(), {
    method: method,
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(clearObject(params)),
    headers: clearObject(Object.assign({ Authorization: token }, headers)),
  }).then((res) => res.json());
}
export default request;
