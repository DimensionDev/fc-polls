import { Poll } from "@/types";

// FIXME: Maybe we should refactor this compare logic
export const isCreatedByProfileId = (poll: Poll, profileId?: string) => {
    return !!profileId && poll.created_by === profileId;
};