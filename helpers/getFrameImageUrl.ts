import urlcat from "urlcat";

import { HOST } from "@/constants/env";
import { ImageQuery } from "@/constants/zod";

export const getFrameImageUrl = (options: ImageQuery) => {
    return urlcat(`${HOST}/api/image`, {
        ...options,
        date: `${Date.now()}`
    });
};
