export function toWords(camelCase: string) {
  if (camelCase === null)
    return null;

  return camelCase.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
}
