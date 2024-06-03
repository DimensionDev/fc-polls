import { Poll } from "@/app/types";
import { MIN_VALID_IN_DAYS } from "@/constants";
import { FRAME_PLATFORM, POLL_STATUS } from "@/constants/enum";

export const createNullPoll = (): Poll => ({
    id: '',
    title: 'No poll found',
    created_at: 0,
    created_by: '',
    platform: FRAME_PLATFORM.Farcaster,
    validInDays: MIN_VALID_IN_DAYS,
    status: POLL_STATUS.Active,
    totalVotes: 0,
    options: [
        { id: '1', text: '', votes: 0 },
        { id: '2', text: '', votes: 0 },
        { id: '3', text: '', votes: 0 },
        { id: '4', text: '', votes: 0 },
    ],
});