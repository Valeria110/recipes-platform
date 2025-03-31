export const transformIngredients = (ingredient: string) => {
  const arr = ingredient.split(/[-—]/);
  console.log(arr);

  const ingredientName = arr[0].trim();
  const quantity = arr[1] ? (parseFloat(arr[1]) ?? 0) : 0;
  const units = arr[1]?.replace(/^\s*\d*\.?\d+\s*/, '').trim() || '';
  console.log('quantity: ', quantity, 'units: ', units);

  return { name: ingredientName, quantity, units };
};
