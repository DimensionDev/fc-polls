import urlcat from "urlcat";

import { HOST } from "@/constants/env";
import { ImageQuery } from "@/constants/zod";

export const getFramePostUrl = (options: ImageQuery) => {
    return urlcat(`${HOST}/api/vote`, {
        ...options,
        date: `${Date.now()}`
    })
};
