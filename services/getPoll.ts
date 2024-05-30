import { kv } from '@vercel/kv';

import { Poll } from '@/app/types';

export const getPoll = async (pollId: string, userId?: string): Promise<Poll | null> => {
    const poll = await kv.hgetall<Poll>(`poll:${pollId}`);
    return poll;
};
