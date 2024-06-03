import { kv } from '@vercel/kv';

import { POLL_EXPIRY } from '@/constants';

export const vote = async (pollId: string, buttonIdx: number, profileId: string): Promise<boolean> => {
    const multi = kv.multi();
    multi.hincrby(`poll:${pollId}`, `votes${buttonIdx}`, 1);
    multi.sadd(`poll:${pollId}:voted`, profileId);
    multi.expire(`poll:${pollId}`, POLL_EXPIRY);
    multi.expire(`poll:${pollId}:voted`, POLL_EXPIRY);
    await multi.exec();
    return true;
};
