import { setLocale } from 'yup';
import ru from '@/shared/config/i18n/messages/ru.json';
import en from '@/shared/config/i18n/messages/en.json';

export const validationMessages = {
  ru: ru.Validation,
  en: en.Validation,
};

export const setYupLocale = (locale: string) => {
  const messages = locale === 'ru' || locale === 'en' ? validationMessages[locale] : validationMessages.en;
  if (!messages) return;

  setLocale({
    mixed: {
      required: messages.required,
      notType: messages.notType,
    },
    string: {
      min: ({ min, path }) => {
        switch (path) {
          case 'recipeTitle':
            return messages.string.min.recipeTitle;
          case 'description':
            return messages.string.min.description;
          case 'instructions':
            return messages.string.min.instructions;
          default:
            return messages.string.min.default.replace('{min}', String(min));
        }
      },
      max: ({ max }) => messages.string.max.replace('{max}', String(max)),
      email: messages.string.email,
    },
    number: {
      min: ({ min, path }) => {
        switch (path) {
          case 'servingNum':
            return messages.number.min.servingNum;
          case 'preparationTime.hours':
            return messages.number.min.preparationTimeHours;
          case 'preparationTime.minutes':
            return messages.number.min.preparationTimeMinutes;
          case 'cookingTime.hours':
            return messages.number.min.cookingTimeHours;
          case 'cookingTime.minutes':
            return messages.number.min.cookingTimeMinutes;
          default:
            return messages.number.min.default?.replace?.('{min}', String(min)) || `Must be at least ${min}`;
        }
      },
      max: ({ max }) => messages.number.max.replace('{max}', String(max)),
    },
    array: {
      min: ({ min, path }) => {
        switch (path) {
          case 'foodCategory':
            return messages.array.foodCategory;
          case 'cuisineType':
            return messages.array.cuisineType;
          case 'ingredients':
            return messages.array.ingredients;
          default:
            return messages.array.min.replace('{min}', String(min));
        }
      },
    },
  });
};
