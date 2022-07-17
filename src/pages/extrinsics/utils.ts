export const arrayCompare = <T = unknown>(arr1?: Array<T>, arr2?: Array<T>) => {
  if (arr1 === arr2) {
    return true;
  }

  if (arr1?.length !== arr2?.length) {
    return false;
  }
     
  return arr1?.every((item, i) => item === arr2?.[i]);
};
