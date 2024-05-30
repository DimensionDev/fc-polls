import * as fs from 'fs';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { join } from 'path';

import { PollCard } from '@/components/PollCard';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { createErrorResponseJSON } from '@/helpers/createErrorResponseJSON';
import { getSearchParamsFromRequestWithZodObject } from '@/helpers/getSearchParamsFromRequestWithZodObject';
import { getPoll } from '@/services/getPoll';

const fontPath = join(process.cwd(), './assets/Roboto-Regular.ttf');
const fontData = fs.readFileSync(fontPath);

export async function GET(request: NextRequest) {
    try {
        const queryData = getSearchParamsFromRequestWithZodObject(request, IMAGE_QUERY_SCHEMA);

        if (!queryData.id) {
            return createErrorResponseJSON('Missing poll ID');
        }

        const poll = await getPoll(queryData.id, queryData.userId);
        if (!poll) {
            return createErrorResponseJSON('Missing poll');
        }

        return new ImageResponse(<PollCard poll={poll} theme={queryData.theme} />, {
            width: 600,
            height: 400,
            fonts: [
                {
                    data: fontData,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400,
                },
            ],
        });
    } catch (error) {
        return createErrorResponseJSON('Failed to generate poll data');
    }
}
