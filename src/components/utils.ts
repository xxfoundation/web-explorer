export const arrayCompare = <T = unknown>(arr1?: Array<T>, arr2?: Array<T>) => {
  if (arr1 === arr2) {
    return true;
  }

  if (arr1?.length !== arr2?.length) {
    return false;
  }
     
  return arr1?.every((item, i) => item === arr2?.[i]);
};

export const processEventDoc = (doc: string) => {
  const substring = doc
    .replace(/\[\"/g, '')
    .replace(/\]\"/g, '')
    .substring(doc.indexOf('\\') + 1, doc.lastIndexOf('\\') - 3);
  return substring ? substring.replace(/,","/g, ' ').replace(/,/g, '').split(' ') : undefined;
};

