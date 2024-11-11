export const toNumberFields = (data: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
        return [key, Number(value)];
      }
      return [key, value];
    })
  );
};
