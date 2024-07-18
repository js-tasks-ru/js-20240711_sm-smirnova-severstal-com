/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const map = new Map(Object.entries(obj));
    let newMap = new Map();

    for (const field of fields) {
        newMap.set(field, map.get(field));          
      }

    return Object.fromEntries(newMap);
};
