import { FRAME_SOURCE } from "@/constants/enum";

export const resolveFrameSource = (frameSource: string): FRAME_SOURCE | null => {
    switch (frameSource) {
        case FRAME_SOURCE.Farcaster:
            return FRAME_SOURCE.Farcaster;
        case FRAME_SOURCE.Lens:
            return FRAME_SOURCE.Lens;
        default:
            return null;
    }
};
