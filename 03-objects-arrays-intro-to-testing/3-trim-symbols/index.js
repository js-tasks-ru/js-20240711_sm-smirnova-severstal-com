/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let newString = '';
    if (string === null || string.length === 0 || size === 0)
        return newString;
    if (typeof size === "undefined" || size === null)
        return string;
    let counter = 0;
    let prevChar = '';
    for (const char of string) {
        if (char !== prevChar) {
            prevChar = char;
            counter = 0;
        }
        if (counter < size && char === prevChar) {
            newString += char;
            counter++;
        }
    }
    return newString;
}
