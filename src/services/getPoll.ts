import urlcat from 'urlcat';

import { FIREFLY_ROOT_URL } from '@/constants';
import { FRAME_SOURCE } from '@/constants/enum';
import { fetchJSON } from '@/helpers/fetchJSON';
import { GetPollResponse, Poll } from '@/types/api';

export const getPoll = async (pollId: string, source: FRAME_SOURCE, profileId?: string): Promise<Poll | null> => {
    const url = urlcat(FIREFLY_ROOT_URL, '/v1/vote_frame/poll', {
        poll_id: pollId,
        platform: source,
        platform_id: profileId ?? '',
    });

    const response = await fetchJSON<GetPollResponse>(url);

    return response.data ?? null;
};
