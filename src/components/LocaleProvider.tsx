'use client';

import { useMemo } from 'react';

import { LOCALE } from '@/constants/enum';
import { LocaleContext } from '@/hooks/useTranslate';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const initialValue = useMemo(() => ({ locale: LOCALE.ZH }), []);
  
  return <LocaleContext.Provider value={initialValue}>{children}</LocaleContext.Provider>;
}
