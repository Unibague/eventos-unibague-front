const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const convertSnakeToCamel = (obj) => {
  if (obj !== null && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map(item => convertSnakeToCamel(item)); // Recursively handle each item in the array
    }
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = convertSnakeToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
