import { env } from '@/constants/env';

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = 'normal' | 'italic';
interface Font {
    data: Buffer | ArrayBuffer;
    name: string;
    weight?: Weight;
    style?: FontStyle;
    lang?: string;
}

let fonts: Font[] = [];

export async function loadFonts() {
    try {
        if (!fonts.length) {
            const normalFont = await fetch(`${env.external.NEXT_PUBLIC_HOST}/Inter-Regular.ttf`).then((res) =>
                res.arrayBuffer(),
            );
            const boldFont = await fetch(`${env.external.NEXT_PUBLIC_HOST}/Inter-Bold.ttf`).then((res) =>
                res.arrayBuffer(),
            );

            fonts = [
                {
                    name: 'Inter',
                    data: normalFont,
                    weight: 400,
                },
                {
                    name: 'Inter',
                    data: boldFont,
                    weight: 700,
                },
            ];
        }

        return fonts;
    } catch {
        return [];
    }
}
