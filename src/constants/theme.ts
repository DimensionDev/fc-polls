import { PollTheme } from '@/types';

export enum IMAGE_THEME {
    Dark = 'dark',
    Light = 'light',
}

export const DARK_THEME: PollTheme = {
    titleColor: '#f5f5f5',
    optionBgColor: 'rgba(172, 157, 246, 0.2)',
    optionTextColor: '#f5f5f5',
    optionSelectedTextColor: '#AC9DF6',
    optionSelectedBgColor: '#AC9DF6',
    cardBgColor: '#181818',
    secondTextColor: '#ffffff',
    percentColor: '#FFFFFF70',
};

export const LIGHT_THEME: PollTheme = {
    titleColor: '#07101B',
    optionBgColor: '#cfcfcf',
    optionTextColor: '#181818',
    optionSelectedTextColor: '#181818',
    optionSelectedBgColor: '#AC9DF6',
    cardBgColor: '#ffffff',
    secondTextColor: '#767676',
    percentColor: '#181818',
};

export const THEME_CONFIG = {
    [IMAGE_THEME.Dark]: DARK_THEME,
    [IMAGE_THEME.Light]: LIGHT_THEME,
};
