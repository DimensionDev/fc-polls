import { PollTheme } from "@/types";

interface ErrorHandlerProps {
    text: string;
    theme: PollTheme;
}

export function ErrorHandler({ text, theme }: ErrorHandlerProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: 40,
                backgroundColor: theme.cardBgColor,
            }}
        >
            <h1 style={{
                textAlign: 'center',
                fontSize: '18px',
                color: theme.optionTextColor,
            }}>{text}</h1>
        </div>
    );
}
