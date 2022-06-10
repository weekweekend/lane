function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('ok'), time);
  });
}
export default sleep;
