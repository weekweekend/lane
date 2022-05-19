import { clearObject } from './transform';

function getSearchParams(hahsStr: string) {
  if (!hahsStr.includes('?')) return '';
  const params: any = clearObject(Object.fromEntries(new URLSearchParams(hahsStr.split('?')[1])));
  return params;
}
export default getSearchParams;
