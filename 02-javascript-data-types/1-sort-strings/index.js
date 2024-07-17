/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const newArr = [...arr].sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }));
    return param === 'asc' ? newArr : newArr.reverse();
}

// let arr2 = arr.sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" }));
// if (param === 'desc')
// {
//     arr2 = arr2.reverse();
// }
// return arr2;





// function withCase(a, b) {
//     let res = a.localeCompare(b);
//     // alert(`a: ${a} b: ${b} res: ${res} a.codePointAt(0): ${a.codePointAt(0)}  < b.codePointAt(0): ${b.codePointAt(0)} a.toLowerCase(): ${a.toLowerCase()} b.toLowerCase(): ${b.toLowerCase()} ` );
//     if (res === 1 && a.codePointAt(0) < b.codePointAt(0) && a[0].toLowerCase() === b[0].toLowerCase())
//     {
//         return res * -1;
//     }
//     else 
//     {
//         return res;
//     }
// }
// let arr2 = arr;
// if (param === 'asc')
// {
//     return arr2.sort((a, b) => withCase(a, b) );  
// }
// else if (param === 'desc'){
//     //   arr.sort((a, b) => b.codePointAt(0) > a.codePointAt(0) && b.localeCompare(a) );

//       return arr2.sort((a, b) => withCase(a, b) ).reverse(); 
// }
// else return arr;


//
/*
ожно упростить и сделать так
arr.sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" })
и реализовать для разных направлений сортировки
*/