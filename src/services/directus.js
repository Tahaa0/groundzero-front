import { createDirectus } from '@directus/sdk';
import { rest,  } from '@directus/sdk/rest';

export const directus = createDirectus('https://groundzerodirectus.azurewebsites.net/').with(rest());

export function getTranslation(page, languageCode) {
  return page.translations.find((translation) => translation.languages_code === languageCode);
}
