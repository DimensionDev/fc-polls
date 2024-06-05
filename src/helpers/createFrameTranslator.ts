import { locales } from '@/config/frameLocales';
import { LOCALE } from '@/constants/enum';

const originalToKey = (original: string) => {
    return original.toLowerCase().replace(/ /g, '_');
};

export const createFrameTranslator = (locale: LOCALE) => {
    const currentLocale = locales[locale] ?? locales[LOCALE.EN];
    return (original: string) => {
        const key = originalToKey(original);
        return currentLocale[key] ?? original;
    };
};
