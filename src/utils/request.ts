import { clearObject } from './transform';
import { FC } from 'react';

// export function get(url: string, searchParams: Record<string, string | number | null | undefined> = {}) {
//   const oUrl = new URL(url, window.location.href);
//   Object.entries(clearObject(searchParams)).forEach(([key, value]) => {
//     oUrl.searchParams.set(key, value);
//   });

//   return fetch(oUrl.toString()).then((res) => res.json());
// }

function request(
  url: string,
  /**请求方法大写*/
  method: string,
  params: Record<string, string | number | null | undefined> = {},
  headers: Record<string, string> = {},
) {
  const oUrl = new URL(url, window.location.href);

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
