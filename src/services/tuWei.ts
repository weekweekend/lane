import request from 'utils/request';

export async function getTuWei() {
  const { content } = await request('https://api.uomg.com/api/rand.qinghua?format=json', 'GET');
  return content as string;
}
