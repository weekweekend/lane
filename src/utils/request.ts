import { clearObject } from './transform';

export function get(url: string, searchParams: Record<string, string | number | null | undefined> = {}) {
  const oUrl = new URL(url, window.location.href);
  Object.entries(clearObject(searchParams)).forEach(([key, value]) => {
    oUrl.searchParams.set(key, value);
  });

  return fetch(oUrl.toString()).then((res) => res.json());
}
