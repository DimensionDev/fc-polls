import { createContext, useContext } from 'react';

import { LOCALE } from "@/constants/enum";
import { createFrameTranslator } from "@/helpers/createFrameTranslator";

export const LocaleContext = createContext<{ locale: LOCALE }>({
    locale: LOCALE.EN
})

export const useTranslate = () => {
    const { locale } = useContext(LocaleContext);
    const t = createFrameTranslator(locale);
    return t;
};
