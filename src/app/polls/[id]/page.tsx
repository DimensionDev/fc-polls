import { fetchMetadata } from 'frames.js/next';
import { Metadata } from 'next';
import urlcat from 'urlcat';

import { RedirectProfile } from '@/components/RedirectProfile';
import { COMMON_APP_TITLE } from '@/constants';
import { env } from '@/constants/env';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';

interface PageProps {
    params: { id: string };
    searchParams: { [key: string]: string };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const queryData = IMAGE_QUERY_SCHEMA.parse({
        ...searchParams,
        id: params.id,
    });

    return {
        title: COMMON_APP_TITLE,
        other: {
            ...(await fetchMetadata(new URL(urlcat('/api/frames', queryData), env.external.NEXT_PUBLIC_HOST))),
        },
        metadataBase: new URL(env.external.NEXT_PUBLIC_HOST),
    };
}

export default async function Page({ searchParams }: PageProps) {

    return <RedirectProfile profileUrl={searchParams.author} />;
}
