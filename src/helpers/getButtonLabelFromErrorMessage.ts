import { LOCALE } from "@/constants/enum";
import { createFrameTranslator } from "@/helpers/createFrameTranslator";

export const getButtonLabelFromErrorMessage = (message: string, locale: LOCALE) => {
    const t = createFrameTranslator(locale);

    if (message === t`No poll found`) {
        return t`Try again`;
    }

    return t`Back to poll`;
};
