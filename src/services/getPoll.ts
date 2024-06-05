import { kv } from '@vercel/kv';

import { FRAME_SOURCE } from '@/constants/enum';
import { Poll } from '@/types';

export const getPoll = async (pollId: string, source: FRAME_SOURCE, profileId?: string): Promise<Poll | null> => {
    const poll = await kv.hgetall<Poll>(`poll:${source}_${pollId}`);
    return poll;
};
