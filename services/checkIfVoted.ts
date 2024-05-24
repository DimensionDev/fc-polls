import { kv } from "@vercel/kv";

export const checkIfVoted = async (pollId: string, fid: number): Promise<boolean> => {
    const existed = await kv.sismember(`poll:${pollId}:voted`, fid)
    return !!existed;
};