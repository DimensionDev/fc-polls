import { POLL_STATUS } from '@/constants/enum';
import { env } from '@/constants/env';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { isCreatedByProfileId } from '@/helpers/isCreatedByProfileId';
import { Poll, PollOption, PollTheme } from '@/types';

export interface PollCardProps {
    poll: Poll;
    theme: IMAGE_THEME;
    newVotedIdx?: number;
    profileId?: string;
}

interface VoteButtonProps {
    text: string;
    theme: PollTheme;
}

interface VoteResultProps {
    option: PollOption;
    totalVotes: number;
    isUserVoted: boolean;
    theme: PollTheme;
}

function VoteButton({ text, theme }: VoteButtonProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.optionTextColor,
                height: 40,
                width: '100%',
                borderRadius: 10,
                border: `1px solid ${theme.optionTextColor}`,
                fontSize: 16,
                fontWeight: 'bold',
            }}
        >
            {text}
        </div>
    );
}

function VoteResult({ option, totalVotes, isUserVoted, theme }: VoteResultProps) {
    const { text, votes = 0 } = option;
    const currentRate = +totalVotes ? parseFloat(((votes / totalVotes) * 100).toFixed(2)) : 0;

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                height: 40,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: currentRate ? `${currentRate}%` : '10px',
                    position: 'absolute',
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor: isUserVoted ? theme.optionSelectedBgColor : theme.optionBgColor,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 20,
                    height: '100%',
                    width: '100%',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: theme.optionTextColor,
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <span style={{ display: 'flex' }}>{text}</span>
                    {isUserVoted ? (
                        <img
                            src={`${env.external.HOST}/tick-circle.png`}
                            style={{
                                display: 'flex',
                                width: 20,
                                height: 20,
                            }}
                        />
                    ) : null}
                </span>
                <span style={{ display: 'flex' }}>{currentRate}%</span>
            </div>
        </div>
    );
}

export function PollCard({ poll, theme, newVotedIdx, profileId }: PollCardProps) {
    const { status, options, totalVotes } = poll;
    const themeConfig = THEME_CONFIG[theme];

    const votedIndexList = options.reduce<number[]>(
        (acc, option, index) => {
            return option.voted ? [...acc, index + 1] : acc;
        },
        newVotedIdx ? [newVotedIdx] : [],
    );
    const showResults =
        status !== POLL_STATUS.Active || votedIndexList.length > 0 || isCreatedByProfileId(poll, profileId);

    return (
        <div
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: themeConfig.cardBgColor,
                lineHeight: 1.2,
                fontSize: 24,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 12,
                    padding: 20,
                }}
            >
                {/* <h2 style={{ textAlign: 'center', color: themeConfig.titleColor }}>{title}</h2> */}
                {options.map((opt, index) =>
                    showResults ? (
                        <VoteResult
                            key={index}
                            option={opt}
                            totalVotes={totalVotes}
                            theme={themeConfig}
                            isUserVoted={votedIndexList.includes(index + 1)}
                        />
                    ) : (
                        <VoteButton key={index} theme={themeConfig} text={opt.text} />
                    ),
                )}
            </div>
        </div>
    );
}
