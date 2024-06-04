import { FrameButton, FrameData } from "@/types";

const getMetaContent = (document: Document, name: string) => {
    return document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content;
};

export const collectFrameDataFromDocument = (): FrameData | null => {
    const imageMeta = document.querySelector<HTMLMetaElement>('meta[name="of:image"]');
    const buttons = document.querySelectorAll<HTMLMetaElement>('meta[name^="of:button:"]');

    const image = imageMeta?.getAttribute('content');
    if (!image) return null;

    const frameButtons = Array.from(buttons).reduce<FrameButton[]>((acc, button) => {
        const raw = button.getAttribute('name')?.split(':');
        if (!raw) return acc;

        const index = Number.parseInt(raw[raw.length - 1], 10);
        if (Number.isNaN(index) || index < 1 || index > 4) return acc;

        const text = button.getAttribute('content');
        if (!text) return acc;

        const action = getMetaContent(document, `of:button:${index}:action`) || 'post';
        const target = getMetaContent(document, `of:button:${index}:target`);

        acc.push({
            index,
            text,
            action,
            target
        });

        return acc;
    }, []).sort((a, b) => a.index - b.index);

    return {
        image,
        buttons: frameButtons
    };
};
