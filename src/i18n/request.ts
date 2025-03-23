import { headers } from 'next/headers';
import acceptLanguageParser from 'accept-language-parser';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const headerStore = await headers();
  const acceptLanguageHeader = headerStore.get('Accept-Language');

  let locale = 'ko';
  if (acceptLanguageHeader) {
    const acceptLanguage = acceptLanguageParser.parse(acceptLanguageHeader)?.[0];
    if (acceptLanguage?.code) {
      locale = acceptLanguage?.code;
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
