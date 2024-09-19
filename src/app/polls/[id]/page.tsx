import { fetchMetadata } from 'frames.js/next';
import { Metadata } from 'next';
import urlcat from 'urlcat';

import { RedirectProfile } from '@/components/RedirectProfile';
import { COMMON_APP_TITLE } from '@/constants';
import { env } from '@/constants/env';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { getPoll } from '@/services/getPoll';

interface PageProps {
    params: { id: string };
    searchParams: { [key: string]: string };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const queryData = IMAGE_QUERY_SCHEMA.parse({
        ...searchParams,
        id: params.id,
    });
    const metadata = await fetchMetadata(new URL(urlcat('/api/frames', queryData), env.external.NEXT_PUBLIC_HOST));
    const poll = await getPoll(queryData.id, queryData.source, queryData.profileId);
    const ogImage = (metadata?.['of:image'] || `${env.external.NEXT_PUBLIC_HOST}/firefly.png`) as string;
    const ogTitle = queryData.handle ? `Polls from @${queryData.handle} via Firefly` : COMMON_APP_TITLE;

    if (metadata) {
        // update this to support hey.xyz
        metadata['og:image'] = ogImage;
        // try to disable cache
        metadata['of:refresh_period'] = '0';
        metadata['fc:frame:refresh_period'] = '0';
    }

    return {
        title: ogTitle,
        other: { ...metadata },
        openGraph: {
            title: ogTitle,
            description: poll?.title || 'Everything app for Web3 natives',
            images: [ogImage],
        },
        metadataBase: new URL(env.external.NEXT_PUBLIC_HOST),
    };
}

export default async function Page({ searchParams }: PageProps) {
    return <RedirectProfile profileUrl={searchParams.author} />;
}
