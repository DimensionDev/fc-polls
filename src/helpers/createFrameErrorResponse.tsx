import { Button } from 'frames.js/next';
import urlcat from 'urlcat';

import { ErrorHandler } from '@/components/ErrorHandler';
import { LOCALE } from '@/constants/enum';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { ImageQuery } from '@/constants/zod';
import { createFrameTranslator } from '@/helpers/createFrameTranslator';

type CreateErrorOptions = {
    text: string;
    queryData: ImageQuery | null;
    noBack?: boolean;
    buttonLabel?: string;
};

export const createFrameErrorResponse = ({ text, noBack = false, queryData, buttonLabel }: CreateErrorOptions) => {
    const { theme = IMAGE_THEME.Light, locale = LOCALE.EN } = queryData ?? {};
    const themeConfig = THEME_CONFIG[theme];
    const t = createFrameTranslator(locale);

    return {
        image: <ErrorHandler text={text} theme={themeConfig} />,
        buttons:
            noBack || !queryData
                ? []
                : [<Button key={0} action="post" target={urlcat(`/`, queryData)}>{buttonLabel ?? t`Back to poll`}</Button>],
    };
};
