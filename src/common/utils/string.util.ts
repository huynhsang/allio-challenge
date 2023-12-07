/**
 * To convert a string into camelcase string
 * E.g: "Abc cdc Da" to "abcCdcDa"
 *
 * @param inputString The given input string
 */
function convertStringToCamelCase(inputString: string): string {
  // Split the string into words
  const words = inputString.split(' ');

  // Capitalize the first letter of each word and join them
  const result = words
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return (result && result.charAt(0).toLowerCase() + result.slice(1)) || result;
}

export { convertStringToCamelCase };
