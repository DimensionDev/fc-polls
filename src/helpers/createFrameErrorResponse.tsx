import { Button } from 'frames.js/next';
import urlcat from 'urlcat';

import { ErrorHandler } from '@/components/ErrorHandler';
import { LOCALE } from '@/constants/enum';
import { IMAGE_THEME, THEME_CONFIG } from '@/constants/theme';
import { ImageQuery } from '@/constants/zod';
import { getButtonLabelFromErrorMessage } from '@/helpers/getButtonLabelFromErrorMessage';

type CreateErrorOptions = {
    text: string;
    queryData: ImageQuery | null;
    noBack?: boolean;
    buttonLabel?: string;
};

export const createFrameErrorResponse = ({ text, noBack = false, queryData, buttonLabel }: CreateErrorOptions) => {
    const { locale = LOCALE.en } = queryData ?? {};
    const themeConfig = THEME_CONFIG[IMAGE_THEME.Dark];

    return {
        image: <ErrorHandler text={text} theme={themeConfig} />,
        buttons:
            noBack || !queryData
                ? []
                : [
                      <Button key={0} action="post" target={urlcat(`/check`, queryData)}>
                          {buttonLabel ?? getButtonLabelFromErrorMessage(text, locale)}
                      </Button>,
                  ],
    };
};
