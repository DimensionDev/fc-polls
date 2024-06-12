import '@/app/globals.css';

import { GeistSans } from 'geist/font/sans';

import { LocaleProvider } from '@/components/LocaleProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={GeistSans.variable}>
            <body>
                <LocaleProvider>{children}</LocaleProvider>
            </body>
        </html>
    );
}
