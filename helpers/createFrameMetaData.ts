import { FrameMetaData, FrameMetaOptions } from '@/app/types';
import { DEFAULT_FRAME_PREFIX, DEFAULT_FRAME_VERSION } from '@/constants';

export const createFrameMetaData = ({
    og,
    image,
    postUrl,
    buttons,
    prefix = DEFAULT_FRAME_PREFIX,
}: FrameMetaOptions): FrameMetaData => {
    const buttonMetaList = buttons.reduce<FrameMetaData['frameMetaList']>((acc, button, index) => {
        const metaName = `${prefix}:frame:button:${index + 1}`;

        acc.push({ name: metaName, content: button.text });
        if (button.action) {
            acc.push({ name: `${metaName}:action`, content: button.action });
        }

        return acc;
    }, []);

    return {
        openGraph: {
            title: og.title,
            images: og.images ?? [image],
        },
        frameMetaList: [
            { name: `${prefix}:frame`, content: DEFAULT_FRAME_VERSION },
            { name: `${prefix}:frame:post_url`, content: postUrl },
            { name: `${prefix}:frame:image`, content: image },
            ...buttonMetaList,
        ],
    };
};
