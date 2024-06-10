import { locales } from '@/config/frameLocales';
import { LOCALE } from '@/constants/enum';

const DYNAMIC_CHUNK = /\{([^{}]+)\}/g;

const chunksToKey = (chunks: TemplateStringsArray) => {
    return chunks.join('_');
};

export const createFrameTranslator = (locale: LOCALE) => {
    const currentLocale = locales[locale] ?? locales[LOCALE.EN];
    return (chunks: TemplateStringsArray, ...params: any[]) => {
        const key = chunksToKey(chunks);
        if (!currentLocale[key]) {
            return chunks.reduce((acc, chunk, index) => {
                return acc + chunk + (index === chunks.length - 1 ? '' : params[index]);
            }, '');
        }
        return currentLocale[key].replace(DYNAMIC_CHUNK, (_, index) => {
            return String(params[index]);
        });
    };
};
