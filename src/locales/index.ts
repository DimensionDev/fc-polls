import { LOCALE } from '@/constants/enum';
import en from '@/locales/en/index';
import zhHans from '@/locales/zh-Hans/index';
import zhHant from '@/locales/zh-Hant/index';

/**
 * It wont work in react, just work in jsx render
 * especially for frame image text and button text
 */
export const locales: Record<LOCALE, Record<string, string>> = {
    [LOCALE.en]: en,
    [LOCALE.zhHans]: zhHans,
    [LOCALE.zhHant]: zhHant,
};
