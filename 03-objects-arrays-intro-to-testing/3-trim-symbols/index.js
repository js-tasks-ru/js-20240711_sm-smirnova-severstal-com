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
    const arr = string.split('');
    const map = new Map();
    let indBig = 0;
    let key;
    for (const theChar of arr) {
        key = String(indBig).concat(':', theChar);
        if (map.has(key))
        {
            let ind = map.get(key);
            ind++;
            map.set(key, ind);
        } else {
            indBig++;            
            key = String(indBig).concat(':', theChar);
            map.set(key, 1);
        }
    }
    function BuildString(value, key, map) {
        const pos = key.indexOf(':') + 1;
        const symbol = key.slice(pos);
        const to = value < size ? value : size;
        newString = newString.concat(symbol);
        for(let i = 1; i < to; i++ )
        {
            newString = newString.concat(symbol);
        }
      }
    map.forEach(BuildString);
    return newString;
}
