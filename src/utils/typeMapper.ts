export const typeMapper = (data: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (value === null || value === undefined) {
        // Asignar valores predeterminados según el tipo esperado
        return [
          key,
          typeof value === 'boolean'
            ? false
            : typeof value === 'number'
            ? 0
            : ''
        ];
      }
      if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
        return [key, Number(value)];
      }
      return [key, value];
    })
  );
};
