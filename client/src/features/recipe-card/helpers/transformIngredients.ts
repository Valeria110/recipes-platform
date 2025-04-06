export const transformIngredients = (ingredient: string) => {
  const match = ingredient.match(/^(.*)\s-\s(\d*\.?\d+)?\s*(.*)?$/);

  if (!match) {
    return { name: ingredient.trim(), quantity: 0, units: '' };
  }

  const [, name, qty, unit] = match;
  const quantity = qty ? (parseFloat(qty) === 0 ? '' : parseFloat(qty)) : '';

  return {
    name: name.trim(),
    quantity,
    units: unit ? unit.trim() : '',
  };
};
