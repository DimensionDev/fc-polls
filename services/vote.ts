import { kv } from '@vercel/kv';

import { POLL_EXPIRY } from '@/constants';

export const vote = async (pollId: string, buttonId: number, fid: number): Promise<boolean> => {
    const multi = kv.multi();
    multi.hincrby(`poll:${pollId}`, `votes${buttonId}`, 1);
    multi.sadd(`poll:${pollId}:voted`, fid);
    multi.expire(`poll:${pollId}`, POLL_EXPIRY);
    multi.expire(`poll:${pollId}:voted`, POLL_EXPIRY);
    await multi.exec();
    return true;
};
