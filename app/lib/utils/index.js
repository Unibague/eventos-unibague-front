const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const convertSnakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertSnakeToCamel);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = convertSnakeToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
