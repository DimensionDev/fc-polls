import { LOCALE } from '@/constants/enum';
import en from '@/locales/en/index';
import zh from '@/locales/zh/index';

/**
 * It wont work in react, just work in jsx render
 * especially for frame image text and button text
 */
export const locales: Record<LOCALE, Record<string, string>> = {
    [LOCALE.EN]: en,
    [LOCALE.ZH]: zh,
};
