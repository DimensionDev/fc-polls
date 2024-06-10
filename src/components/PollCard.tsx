import { LOCALE } from '@/constants/enum';
import { env } from '@/constants/env';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { getPollTimeLeft } from '@/helpers/getPollTimeLeft';
import { PollTheme } from '@/types';
import { ChoiceDetail, Poll } from '@/types/api';

export interface PollCardProps {
    poll: Poll;
    theme: IMAGE_THEME;
    locale: LOCALE;
}

interface VoteButtonProps {
    text: string;
    theme: PollTheme;
}

interface VoteResultProps {
    choice: ChoiceDetail;
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

function VoteResult({ choice, theme }: VoteResultProps) {
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
                    width: choice.percent ? `${choice.percent}%` : '10px',
                    position: 'absolute',
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor: choice.is_select ? theme.optionSelectedBgColor : theme.optionBgColor,
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
                    color: choice.is_select ? theme.optionSelectedTextColor : theme.optionTextColor,
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <span style={{ display: 'flex' }}>{choice.name}</span>
                    {choice.is_select ? (
                        <img
                            src={`${env.external.NEXT_PUBLIC_HOST}/tick-circle.png`}
                            style={{
                                display: 'flex',
                                width: 20,
                                height: 20,
                            }}
                        />
                    ) : null}
                </span>
                <span style={{ display: 'flex' }}>{choice.percent}%</span>
            </div>
        </div>
    );
}

export function PollCard({ poll, theme, locale }: PollCardProps) {
    const { is_end, choice_detail, vote_count } = poll;
    const themeConfig = THEME_CONFIG[theme];

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexDirection: 'column',
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
                {choice_detail.map((choice, index) =>
                    is_end || choice_detail.some((choice) => choice.is_select) ? (
                        <VoteResult key={index} choice={choice} theme={themeConfig} />
                    ) : (
                        <VoteButton key={index} theme={themeConfig} text={choice.name} />
                    ),
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    color: themeConfig.secondTextColor,
                    fontSize: 12,
                    padding: 20,
                    gap: 20,
                }}
            >
                <span>
                    {vote_count} Votes · {getPollTimeLeft(poll, locale)}
                </span>
                <span>via Firefly</span>
            </div>
        </div>
    );
}
