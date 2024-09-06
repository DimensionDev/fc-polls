import { IMAGE_ZOOM_SCALE } from '@/constants';
import { LOCALE } from '@/constants/enum';
import { env } from '@/constants/env';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { getPollTimeLeft } from '@/helpers/getPollTimeLeft';
import { PollTheme } from '@/types';
import { ChoiceDetail, Poll } from '@/types/api';

export interface PollCardProps {
    poll: Poll;
    theme: IMAGE_THEME;
    locale: LOCALE;
    profileId?: string;
}

interface VoteButtonProps {
    text: string;
    theme: PollTheme;
}

interface VoteResultProps {
    choice: ChoiceDetail;
    theme: PollTheme;
    isMax: boolean;
}

function VoteButton({ text, theme }: VoteButtonProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                color: theme.secondTextColor,
                height: 20 * IMAGE_ZOOM_SCALE,
                width: '100%',
                fontSize: 18 * IMAGE_ZOOM_SCALE,
            }}
        >
            <span
                style={{
                    marginRight: 9 * IMAGE_ZOOM_SCALE,
                    width: 12 * IMAGE_ZOOM_SCALE,
                    height: 12 * IMAGE_ZOOM_SCALE,
                    borderRadius: '50%',
                    backgroundColor: theme.secondTextColor,
                }}
            />
            <div
                style={{
                    display: 'flex',
                    maxWidth: '90%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {text}
            </div>
        </div>
    );
}

function VoteResult({ choice, theme, isMax }: VoteResultProps) {
    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                height: 20 * IMAGE_ZOOM_SCALE,
                backgroundColor: theme.optionBgColor,
                borderRadius: 4 * IMAGE_ZOOM_SCALE,
                fontSize: 12 * IMAGE_ZOOM_SCALE,
                color: theme.secondTextColor,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    display: 'flex',
                    zIndex: 0,
                    height: '100%',
                    width: `${choice.percent}%`,
                    backgroundColor: isMax ? theme.optionSelectedBgColor : theme.optionBgColor,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    paddingLeft: 4 * IMAGE_ZOOM_SCALE,
                    paddingRight: 8 * IMAGE_ZOOM_SCALE,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '86%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {choice.is_select ? (
                        <img
                            alt="selected"
                            style={{
                                width: 16 * IMAGE_ZOOM_SCALE,
                                height: 16 * IMAGE_ZOOM_SCALE,
                            }}
                            src={`${env.external.NEXT_PUBLIC_HOST}/selected.png`}
                        />
                    ) : null}
                    {choice.name}
                </div>
                <span>{choice.percent}%</span>
            </div>
        </div>
    );
}

export function PollCard({ poll, locale, profileId }: PollCardProps) {
    const { is_end, choice_detail, vote_count } = poll;
    const themeConfig = THEME_CONFIG[IMAGE_THEME.Dark];
    const t = createFrameTranslator(locale);

    const maxPercent = Math.max(...choice_detail.map((choice) => choice.percent || 0));
    const showResult = is_end || choice_detail.some((choice) => choice.is_select);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                backgroundColor: themeConfig.cardBgColor,
                lineHeight: 1.2,
                fontSize: 24 * IMAGE_ZOOM_SCALE,
                backgroundImage: `url(${env.external.NEXT_PUBLIC_HOST}/bg.jpeg)`,
                backgroundSize: '100% 100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        marginTop: 120 * IMAGE_ZOOM_SCALE,
                        justifyContent: 'center',
                        width: '100%',
                        fontSize: 12 * IMAGE_ZOOM_SCALE,
                        color: is_end ? themeConfig.secondTextColor : themeConfig.optionSelectedTextColor,
                        opacity: is_end ? 0.5 : 1,
                    }}
                >
                    {t`${vote_count} vote${vote_count !== 1 ? 'S' : ''}`} · {getPollTimeLeft(poll, locale)}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: (profileId ? 6 : 30) * IMAGE_ZOOM_SCALE,
                        padding: `0 ${72 * IMAGE_ZOOM_SCALE}px`,
                        width: '100%',
                        color: themeConfig.secondTextColor,
                        fontSize: 16 * IMAGE_ZOOM_SCALE,
                        textAlign: 'center',
                    }}
                >
                    <div style={{
                        display: '-webkit-box',
                        WebkitLineClamp: profileId ? 2 : 5,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                    }}>
                        {poll.title}
                    </div>
                </div>
                {profileId ? (
                    <div
                        style={{
                            display: 'flex',
                            gap: 4 * IMAGE_ZOOM_SCALE,
                            justifyContent: 'center',
                            marginTop: 12 * IMAGE_ZOOM_SCALE,
                        }}
                    >
                        {[0, 1, 2].map((index) => (
                            <span
                                key={index}
                                style={{
                                    width: 4 * IMAGE_ZOOM_SCALE,
                                    height: 4 * IMAGE_ZOOM_SCALE,
                                    backgroundColor: themeConfig.secondTextColor,
                                }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
            {profileId ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 7 * IMAGE_ZOOM_SCALE,
                        padding: `0 ${114 * IMAGE_ZOOM_SCALE}px`,
                    }}
                >
                    {choice_detail.map((choice, index) => {
                        return showResult ? (
                            <VoteResult
                                key={index}
                                choice={choice}
                                theme={themeConfig}
                                isMax={!!choice.percent && choice.percent === maxPercent}
                            />
                        ) : (
                            <VoteButton key={index} text={choice.name} theme={themeConfig} />
                        );
                    })}
                </div>
            ) : null}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: 16 * IMAGE_ZOOM_SCALE,
                    fontSize: 10 * IMAGE_ZOOM_SCALE,
                    color: themeConfig.secondTextColor,
                }}
            >
                {t`Via Firefly`}
            </div>
        </div>
    );
}
