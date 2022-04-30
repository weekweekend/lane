import { get } from 'utils/request';

export async function getTuWei() {
  const { content } = await get('https://api.uomg.com/api/rand.qinghua?format=json');
  return content as string;
}
