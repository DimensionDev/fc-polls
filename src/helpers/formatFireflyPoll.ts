import { FRAME_SOURCE, POLL_STATUS } from "@/constants/enum";
import { Poll } from "@/types";
import { Poll as FireflyPoll } from "@/types/api";

export const formatFireflyPoll = (fireflyPoll: FireflyPoll, source: FRAME_SOURCE): Poll => {
    return {
        id: fireflyPoll.poll_id,
        title: fireflyPoll.title,
        created_at: fireflyPoll.created_time,
        source,
        created_by: '',
        status: fireflyPoll.is_end ? POLL_STATUS.Closed : POLL_STATUS.Active,
        totalVotes: fireflyPoll.vote_count,
        validInDays: Math.floor((fireflyPoll.end_time - fireflyPoll.created_time) / 86400),
        options: fireflyPoll.choice_detail.map((choice) => ({
            id: `${choice.id}`,
            text: choice.name,
            votes: choice.count,
            voted: choice.is_select,
        })),
    };
};