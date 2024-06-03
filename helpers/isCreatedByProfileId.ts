import { Poll } from "@/app/types";

// FIXME: Maybe we should refactor this compare logic
export const isCreatedByProfileId = (poll: Poll, profileId?: string) => {
    return poll.created_by === profileId;
};