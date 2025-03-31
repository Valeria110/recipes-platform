export const transformIngredients = (ingredient: string) => {
  const arr = ingredient.split(/[-—]/);

  const ingredientName = arr[0].trim();
  const quantity = arr[1] ? (parseInt(arr[1]) ?? 0) : 0;
  const units = arr[1] ? arr[1].replace(/\d+/g, '').trim() : '';

  return { name: ingredientName, quantity, units };
};
