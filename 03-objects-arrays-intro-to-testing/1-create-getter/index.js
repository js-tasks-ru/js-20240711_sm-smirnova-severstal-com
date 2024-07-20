/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
     return function (obj) {
        const arr = path.split(".");
        const iterator1 = arr[Symbol.iterator]();
        let value = obj;
        for (const prop of iterator1) {
            if (Object.hasOwn(value, prop)){
                value = value[prop];
            } else {
                return;
            }
        }
        return value;
    }
  
}
