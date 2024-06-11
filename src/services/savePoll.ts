import urlcat from 'urlcat';

import { FIREFLY_ROOT_URL } from '@/constants';
import { POLL_CHOICE_TYPE } from '@/constants/enum';
import { fetchJSON } from '@/helpers/fetchJSON';
import { getPollDurationSeconds } from '@/helpers/getPollDurationSeconds';
import { CompositePoll } from '@/types';
import { CreatePollRequest, CreatePollResponse } from '@/types/api';

export const savePoll = async (poll: CompositePoll, text: string): Promise<string> => {
    const request: CreatePollRequest = {
        title: text,
        choices: poll.options.map((x) => x.text),
        type: poll.type,
        sub_time: getPollDurationSeconds(poll.duration),
        strategies: poll.strategies,
    };

    if (poll.type === POLL_CHOICE_TYPE.Multiple) {
        request.multiple_count = poll.multiple_count;
    }

    const response = await fetchJSON<CreatePollResponse>(
        urlcat(FIREFLY_ROOT_URL, '/v1/vote_frame/poll/create'),
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    );

    if (!response.data?.poll_id) throw new Error('Failed to create poll');

    return response.data.poll_id;
};
