export const uppercaseFirstLetter = (value: string) => {
    return value?.charAt(0).toUpperCase() + value?.slice(1);
}

export const isJson = (string: string) => {
    if (!string) return false;
    if (/^[\],:{}\s]*$/.test(string.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      return true;
    }
  
    return false;
}