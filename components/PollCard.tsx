import { Poll } from '@/app/types';
import { POLL_STATUS } from '@/constants/enum';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { isCreatedByProfileId } from '@/helpers/isCreatedByProfileId';

export interface PollCardProps {
    poll: Poll;
    theme: IMAGE_THEME;
    newVotedIdx?: number;
    profileId?: string;
}

export function PollCard({ poll, theme, newVotedIdx, profileId }: PollCardProps) {
    const { status, options, totalVotes, title } = poll;
    const themeConfig = THEME_CONFIG[theme];

    const votedIndexList = options.reduce<number[]>((acc, option, index) => {
        return option.voted ? [...acc, index + 1] : acc;
    }, newVotedIdx ? [newVotedIdx] : []);
    const showResults = status !== POLL_STATUS.Active ||
        votedIndexList.length > 0 ||
        isCreatedByProfileId(poll, profileId)

    return (
        <div
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: themeConfig.cardBgColor,
                padding: 50,
                lineHeight: 1.2,
                fontSize: 24,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20,
                }}
            >
                <h2 style={{ textAlign: 'center', color: themeConfig.titleColor }}>{title}</h2>
                {options.map((opt, index) => {
                    const percentOfTotal = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                backgroundColor: showResults
                                    ? votedIndexList.includes(index + 1)
                                        ? themeConfig.optionSelectedBgColor
                                        : themeConfig.optionBgColor
                                    : 'transparent',
                                color: themeConfig.optionTextColor,
                                padding: 10,
                                marginBottom: 12,
                                borderRadius: 10,
                                width: `${showResults ? percentOfTotal : 100}%`,
                                whiteSpace: 'nowrap',
                                overflow: 'visible',
                            }}
                        >
                            <span>
                                {showResults ? `${percentOfTotal}%: ` : `${index + 1}. `}
                                {opt.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
