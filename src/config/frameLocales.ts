import { LOCALE } from "@/constants/enum";

/**
 * It wont work in react, just work in jsx render
 * especially for frame image text and button text
*/
export const locales: Record<LOCALE, Record<string, string>> = {
    [LOCALE.EN]: {
        test: 'test',
        name: 'name',
    },
    [LOCALE.ZH]: {
        test: '测试',
        name: '名称',
    },
};
