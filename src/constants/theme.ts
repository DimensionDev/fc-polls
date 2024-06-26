import { PollTheme } from '@/types';

export enum IMAGE_THEME {
    Dark = 'dark',
    Light = 'light',
}

export const DARK_THEME: PollTheme = {
    titleColor: '#f5f5f5',
    optionBgColor: '#ffffff21',
    optionTextColor: '#f5f5f5',
    optionSelectedTextColor: '#181818',
    optionSelectedBgColor: '#8e96ff',
    cardBgColor: '#030303',
    secondTextColor: '#ffffff',
};

export const LIGHT_THEME: PollTheme = {
    titleColor: '#07101B',
    optionBgColor: '#cfcfcf',
    optionTextColor: '#181818',
    optionSelectedTextColor: '#181818',
    optionSelectedBgColor: '#8e96ff',
    cardBgColor: '#ffffff',
    secondTextColor: '#767676',
};

export const THEME_CONFIG = {
    [IMAGE_THEME.Dark]: DARK_THEME,
    [IMAGE_THEME.Light]: LIGHT_THEME,
};
