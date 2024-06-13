'use client';

import { LOCALE } from '@/constants/enum';
import { LocaleContext } from '@/hooks/useTranslate';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    return <LocaleContext.Provider value={{ locale: LOCALE.en }}>{children}</LocaleContext.Provider>;
}
