import { IMAGE_ZOOM_SCALE } from '@/constants';
import { PollTheme } from '@/types';

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
                padding: 40 * IMAGE_ZOOM_SCALE,
                backgroundColor: theme.cardBgColor,
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: 18 * IMAGE_ZOOM_SCALE,
                    color: theme.optionTextColor,
                }}
            >
                {text}
            </h1>
        </div>
    );
}
