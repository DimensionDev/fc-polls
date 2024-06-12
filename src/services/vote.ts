import urlcat from 'urlcat';

import { FIREFLY_ROOT_URL } from '@/constants';
import { LOCALE } from '@/constants/enum';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { fetchJSON } from '@/helpers/fetchJSON';
import { VoteRequest, VoteResponse } from '@/types/api';

export const vote = async (options: VoteRequest, locale: LOCALE): Promise<VoteResponse['data']> => {
    const t = createFrameTranslator(locale);
    const response = await fetchJSON<VoteResponse>(urlcat(FIREFLY_ROOT_URL, '/v1/vote_frame/poll/vote'), {
        method: 'POST',
        body: JSON.stringify(options),
    });
    if (!response.data) {
        throw new Error(response.error?.join(',') ?? t`Vote failed`);
    }

    return response.data;
};
