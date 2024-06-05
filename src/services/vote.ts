import { kv } from '@vercel/kv';

import { POLL_EXPIRY } from '@/constants';
import { FRAME_SOURCE } from '@/constants/enum';

export const vote = async (
    pollId: string,
    buttonIdx: number,
    profileId: string,
    source: FRAME_SOURCE,
): Promise<boolean> => {
    const multi = kv.multi();
    const kvKey = `poll:${source}_${pollId}`;

    multi.hincrby(kvKey, `votes${buttonIdx}`, 1);
    multi.sadd(`${kvKey}:voted`, profileId);
    multi.expire(kvKey, POLL_EXPIRY);
    multi.expire(`${kvKey}:voted`, POLL_EXPIRY);
    await multi.exec();
    return true;
};
