import { FrameMetaOptions, Poll } from '@/app/types';
import { ImageQuery } from '@/constants/zod';
import { createFrameMetaData } from '@/helpers/createFrameMetaData';
import { getFrameImageUrl } from '@/helpers/getFrameImageUrl';
import { getFramePostUrl } from '@/helpers/getFramePostUrl';

export const createFrameMetaDataFromPoll = (poll: Poll, options: ImageQuery, noButton?: boolean) => {
    const imageUrl = getFrameImageUrl(options);

    const metaOptions: FrameMetaOptions = {
        image: imageUrl,
        postUrl: getFramePostUrl(options),
        buttons: noButton
            ? []
            : poll.options.map((option) => ({
                  text: option.text,
              })),
        og: {
            title: poll.title,
            images: [imageUrl],
        },
        prefix: options.prefix,
    };

    return createFrameMetaData(metaOptions);
};
