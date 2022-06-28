/** 安全的 JSON 解析 */
// export function parseJSON(text?: string | null) {
//   try {
//     return JSON.parse(text || '');
//   } catch (e) {
//     return null;
//   }
// }

/** 过滤对象 key/value */
export function filterObject<T extends Record<string, any>>(
  obj: T,
  filterFunc: (key: keyof T, value: T[keyof T]) => boolean,
) {
  // 输入对象, 并根据筛选规则过滤对象属性
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => filterFunc(key, value)));
}

export function clearObject<T extends Record<string, any>>(obj: T) {
  // 输入对象, 过滤规则为 留下 属性值 不为  null 和 undefined 的
  return filterObject(obj, (key, value) => ![undefined, null, ''].includes(value));
}
