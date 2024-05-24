interface FrameMetaData {
    imageUrl: string;
    postUrl: string;
    buttons: Array<{
        text: string;
        action?: string;
    }>;
    prefix: string;
    title?: string;
}

export const generateFrameMeta = (frameMetaData: FrameMetaData): string => {
    const { imageUrl, postUrl, buttons, prefix, title } = frameMetaData;
    const metaList: string[] = [
        `<meta name="${prefix}:frame" content="vNext">`,
        `<meta name="${prefix}:frame:image" content="${imageUrl}">`,
        `<meta name="${prefix}:frame:post_url" content="${postUrl}">`,
    ];

    if (title) {
        metaList.push(`<meta property="og:title" content="${title}">`);
        metaList.push(`<meta property="og:image" content="${imageUrl}">`);
    }
    buttons.forEach((button, index) => {
        metaList.push(`<meta name="${prefix}:frame:button:${index + 1}" content="${button.text}">`);
        if (button.action) {
            metaList.push(`<meta name="${prefix}:frame:button:${index + 1}:action" content="${button.action}">`);
        }
    });

    return metaList.join('\n');
};
