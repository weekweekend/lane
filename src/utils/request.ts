import { clearObject } from './transform';

function request(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params: Record<string, string | number | null | undefined> = {},
  headers: Record<string, string> = method === 'GET' ? {} : { 'Content-Type': 'application/json' },
  useToken: boolean = true,
) {
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = token;
  else if (useToken) {
    window.location.href = '#/signIn';
    console.log('请登录');
    return Promise.reject('未登录');
  }

  if (typeof url !== 'string') throw new TypeError('url must be required and of string type');
  let oUrl = new URL(url, 'https://mock.apifox.cn/m1/1066506-0-default/');

  let config = {
    credentials: 'include',
    mode: 'cors',
    headers: clearObject(headers),
    method,
    body: '',
  };
  if (method === 'GET')
    Object.entries(clearObject(params)).forEach(([key, value]) => {
      oUrl.searchParams.set(key, value);
    });
  else config.body = JSON.stringify(clearObject(params));

  return fetch(oUrl.toString(), clearObject(config))
    .then((res) => {
      let { status, statusText } = res;
      if (status >= 200 && status < 400) return res.json();
      return Promise.reject({
        code: 'STATUS ERROR',
        status,
        statusText,
      });
    })
    .catch((reason) => {
      return Promise.reject(reason);
    });
}
export default request;
