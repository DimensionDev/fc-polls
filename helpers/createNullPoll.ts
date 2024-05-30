import { Poll } from "@/app/types";
import { MIN_VALID_IN_DAYS, POLL_STATUS } from "@/constants";

export const createNullPoll = (): Poll => ({
    id: '',
    title: 'No poll found',
    created_at: 0,
    validInDays: MIN_VALID_IN_DAYS,
    status: POLL_STATUS.ACTIVE,
    totalVotes: 0,
    options: [
        { id: '1', text: '', votes: 0 },
        { id: '2', text: '', votes: 0 },
        { id: '3', text: '', votes: 0 },
        { id: '4', text: '', votes: 0 },
    ],
});