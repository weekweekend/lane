/** 安全的 JSON 解析 */
export function parseJSON(text?: string | null) {
  try {
    return JSON.parse(text || '');
  } catch (e) {
    return null;
  }
}

/** 过滤对象 key/value */
export function filterObject<T extends Record<string, any>>(
  obj: T,
  filterFunc: (key: keyof T, value: T[keyof T]) => boolean,
) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => filterFunc(key, value)));
}

export function clearObject<T extends Record<string, any>>(obj: T) {
  return filterObject(obj, (key, value) => [undefined, null].includes(value));
}
