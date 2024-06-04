import { kv } from '@vercel/kv';

import { Poll } from '@/types';

export const savePoll = async (poll: Poll) => {
    await kv.hset(`poll:${poll.id}`, poll);
    await kv.expire(`poll:${poll.id}`, poll.validInDays * 24 * 60 * 60);
    await kv.zadd('polls_by_date', {
        score: Number(poll.created_at),
        member: poll.id,
    });

    return { pollId: poll.id };
};
