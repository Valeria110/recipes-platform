import { IngredientType } from '@/features/recipe-form/model';

export const ingredientsIntoStr = (ingredients: IngredientType[]) => {
  return ingredients.map((ingredient) => {
    const { name, quantity, units } = ingredient;

    const parsedQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;

    const hasQuantity = parsedQuantity && parsedQuantity !== 0;
    const hasUnits = !!units;

    const quantityStr = hasQuantity || hasUnits ? `- ${hasQuantity ? parsedQuantity : ''}` : '';

    return `${name} ${quantityStr} ${units || ''}`.trim();
  });
};
