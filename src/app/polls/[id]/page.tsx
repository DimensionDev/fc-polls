import { fetchMetadata } from 'frames.js/next';
import { Metadata } from 'next';
import urlcat from 'urlcat';

import { FrameViewer } from '@/components/FrameViewer';
import { COMMON_APP_TITLE } from '@/constants';
import { env } from '@/constants/env';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';

interface MetadataProps {
    params: { id: string };
    searchParams: { [key: string]: string };
}

export async function generateMetadata({ params, searchParams }: MetadataProps): Promise<Metadata> {
    const queryData = IMAGE_QUERY_SCHEMA.parse({
        ...searchParams,
        id: params.id,
    });

    return {
        title: COMMON_APP_TITLE,
        other: {
            ...(await fetchMetadata(
                new URL(urlcat("/api/frames", queryData), env.internal.HOST)
            )),
        },
        metadataBase: new URL(env.internal.HOST),
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <FrameViewer />
        </div>
    );
}
