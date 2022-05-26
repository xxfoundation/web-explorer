export const makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export const shortString = (addr: string, offset = 4, replaceStr = '...') =>
  addr
    ? addr.slice(0, offset + 2).concat(replaceStr, addr.slice(addr.length - offset, addr.length))
    : '';