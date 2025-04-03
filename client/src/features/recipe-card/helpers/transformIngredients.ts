export const transformIngredients = (ingredient: string) => {
  const match = ingredient.match(/^(.*)\s-\s(\d*\.?\d+)?\s*(.*)?$/);

  if (!match) {
    return { name: ingredient.trim(), quantity: 0, units: '' };
  }

  const [, name, qty, unit] = match;
  return {
    name: name.trim(),
    quantity: qty ? parseFloat(qty) : '',
    units: unit ? unit.trim() : '',
  };
};
