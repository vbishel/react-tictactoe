

export function containsAll(needle: string[], haystack: string[]): boolean {
  for (let i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1) {
      return false;
    }
  }
  return true;
}

export function randomElementFromArray<T>(arr: T[]):T {
  let randNum = Math.floor(Math.random() * arr.length);
  return arr[randNum];
}