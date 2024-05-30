import { Poll } from "@/app/types";
import { ImageQuery } from "@/constants/zod";
import { createFrameMetaDataFromPoll } from "@/helpers/createFrameMetaDataFromPoll";

export const createFrameMetaLabelFromPoll = (poll: Poll, options: ImageQuery, noButton?: boolean) => {
    const { openGraph, frameMetaList } = createFrameMetaDataFromPoll(poll, options, noButton);

    return [
        `<meta property="og:title" content="${openGraph.title}">`,
        ...openGraph.images.map(
            (image) => `<meta property="og:image" content="${image}">`
        ),
        ...frameMetaList.map(
            ({ name, content }) => `<meta name="${name}" content="${content}">`
        ),
    ].join('\n');
};
