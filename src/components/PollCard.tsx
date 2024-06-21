import { IMAGE_ZOOM_SCALE } from '@/constants';
import { LOCALE } from '@/constants/enum';
import { env } from '@/constants/env';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';
import { getPollTimeLeft } from '@/helpers/getPollTimeLeft';
import { indexToLetter } from '@/helpers/indexToLetter';
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
}

function VoteButton({ text, theme }: VoteButtonProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.optionTextColor,
                height: 40 * IMAGE_ZOOM_SCALE,
                width: '100%',
                borderRadius: 10 * IMAGE_ZOOM_SCALE,
                border: `${1 * IMAGE_ZOOM_SCALE}px solid ${theme.optionTextColor}`,
                fontSize: 16 * IMAGE_ZOOM_SCALE,
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
                height: 40 * IMAGE_ZOOM_SCALE,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: choice.percent ? `${choice.percent}%` : `${10 * IMAGE_ZOOM_SCALE}px`,
                    position: 'absolute',
                    height: '100%',
                    borderRadius: 10 * IMAGE_ZOOM_SCALE,
                    backgroundColor: choice.is_select ? theme.optionSelectedBgColor : theme.optionBgColor,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 20 * IMAGE_ZOOM_SCALE,
                    height: '100%',
                    width: '100%',
                    fontSize: 16 * IMAGE_ZOOM_SCALE,
                    fontWeight: 'bold',
                    color: choice.is_select ? theme.optionSelectedTextColor : theme.optionTextColor,
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8 * IMAGE_ZOOM_SCALE,
                    }}
                >
                    <span style={{ display: 'flex' }}>{choice.name}</span>
                    {choice.is_select ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            alt={choice.name}
                            src={`${env.external.NEXT_PUBLIC_HOST}/tick-circle.png`}
                            style={{
                                display: 'flex',
                                width: 20 * IMAGE_ZOOM_SCALE,
                                height: 20 * IMAGE_ZOOM_SCALE,
                            }}
                        />
                    ) : null}
                </span>
                <span style={{ display: 'flex', color: theme.optionTextColor }}>{choice.percent}%</span>
            </div>
        </div>
    );
}

export function PollCard({ poll, theme, locale, profileId }: PollCardProps) {
    const { is_end, choice_detail, vote_count } = poll;
    const themeConfig = THEME_CONFIG[theme];
    const t = createFrameTranslator(locale);

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
                fontSize: 24 * IMAGE_ZOOM_SCALE,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 12 * IMAGE_ZOOM_SCALE,
                    padding: 20 * IMAGE_ZOOM_SCALE,
                }}
            >
                {choice_detail.map((choice, index) =>
                    (is_end || choice_detail.some((choice) => choice.is_select)) && profileId ? (
                        <VoteResult key={index} choice={choice} theme={themeConfig} />
                    ) : (
                        <VoteButton key={index} theme={themeConfig} text={`${indexToLetter(index)}. ${choice.name}`} />
                    ),
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 40 * IMAGE_ZOOM_SCALE,
                    padding: 20 * IMAGE_ZOOM_SCALE,
                    width: '100%',
                    color: themeConfig.secondTextColor,
                    fontSize: 12 * IMAGE_ZOOM_SCALE,
                }}
            >
                <span>
                    {profileId ? (
                        <span>
                            {t`${vote_count} vote${vote_count !== 1 ? 's' : ''}`} · {getPollTimeLeft(poll, locale)}
                        </span>
                    ) : null}
                </span>
                <span>{t`via Firefly`}</span>
            </div>
        </div>
    );
}
