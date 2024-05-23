import { ComposedPoll } from "@/app/types";
import { Theme, THEME_CONFIG } from "@/constants/theme";
import { calculatePoll } from "@/helpers/calculatePoll";

interface PollCardProps {
    poll: ComposedPoll;
    showResults: boolean;
    hideTitle: boolean;
    theme: Theme;
    votedOption?: number | null;
}

export const PollCard = ({ poll, showResults, hideTitle, theme, votedOption }: PollCardProps) => {
    const pollData = calculatePoll(poll);
    const themeConfig = THEME_CONFIG[theme];

    return (
        <div
            style={{
                justifyContent: "flex-start",
                alignItems: "center",
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundColor: themeConfig.cardBgColor,
                padding: 50,
                lineHeight: 1.2,
                fontSize: 24,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 20,
                }}
            >
                {!hideTitle && (
                    <h2 style={{ textAlign: "center", color: themeConfig.titleColor }}>
                        {poll.title}
                    </h2>
                )}
                {pollData.map((opt, index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                backgroundColor: showResults
                                    ? votedOption === index + 1
                                        ? themeConfig.optionSelectedBgColor
                                        : themeConfig.optionBgColor
                                    : 'transparent',
                                color: themeConfig.optionTextColor,
                                padding: 10,
                                marginBottom: 12,
                                borderRadius: 10,
                                width: `${showResults ? opt.percentOfTotal : 100}%`,
                                whiteSpace: "nowrap",
                                overflow: "visible",
                            }}
                        >
                            <span>
                                {showResults ? `${opt.percentOfTotal}%: ` : `${index + 1}. `}
                                {opt.option}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
