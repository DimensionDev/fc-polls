import { kv } from '@vercel/kv';

import { Poll } from '@/types';

export const getPoll = async (pollId: string, profileId?: string): Promise<Poll | null> => {
    const poll = await kv.hgetall<Poll>(`poll:${pollId}`);
    return poll;
};
