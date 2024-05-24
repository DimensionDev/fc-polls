import { PollTheme } from '@/app/types';

export enum Theme {
    Dark = 'dark',
    Light = 'light',
}

export const DARK_THEME: PollTheme = {
    titleColor: '#f5f5f5',
    optionBgColor: '#ffffff21',
    optionTextColor: '#f5f5f5',
    optionSelectedBgColor: '#8e96ff',
    cardBgColor: '#030303',
};

export const LIGHT_THEME: PollTheme = {
    titleColor: '#07101B',
    optionBgColor: '#cfcfcf',
    optionTextColor: '#181818',
    optionSelectedBgColor: '#8e96ff',
    cardBgColor: '#ffffff',
};

export const THEME_CONFIG = {
    [Theme.Dark]: DARK_THEME,
    [Theme.Light]: LIGHT_THEME,
};
