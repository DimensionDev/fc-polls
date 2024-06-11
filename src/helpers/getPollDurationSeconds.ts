import { CompositePoll } from "@/types";

export const getPollDurationSeconds = (duration: CompositePoll['duration']) => {
    const { days, hours, minutes } = duration;
    return (days * 24 * 60 + hours * 60 + minutes) * 60;
};
