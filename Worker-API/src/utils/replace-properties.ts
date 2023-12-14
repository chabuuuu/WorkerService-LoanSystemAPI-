export function replaceProperties(objA, objB) {
    for (const key in objA) {
      if (objB.hasOwnProperty(key)) {
        objA[key] = objB[key];
      }
    }
  }