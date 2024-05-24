import { Metadata } from 'next';

import { PollVoteForm } from '@/app/form';
import { DEFAULT_FRAME_PREFIX, NULL_POLL } from '@/constants';
import { calculatePoll } from '@/helpers/calculatePoll';
import { getPoll } from '@/services/getPoll';

interface MetadataProps {
    params: { id: string };
    searchParams: { [key: string]: string };
}

export async function generateMetadata({ params, searchParams }: MetadataProps): Promise<Metadata> {
    // read route params
    const id = params.id;
    const prefix = searchParams.prefix || DEFAULT_FRAME_PREFIX;
    const poll = (await getPoll(id)) ?? NULL_POLL;
    const newQuery = new URLSearchParams(searchParams);
    const imageUrl = `${process.env.HOST}/api/image?id=${id}&${newQuery.toString()}`;

    const options = calculatePoll(poll);
    const fcMetadata: Record<string, string> = {
        [`${prefix}:frame`]: 'vNext',
        [`${prefix}:frame:post_url`]: `${process.env.HOST}/api/vote?id=${id}&${newQuery.toString()}`,
        [`${prefix}:frame:image`]: imageUrl,
    };

    options.forEach((option, index) => {
        fcMetadata[`${prefix}:frame:button:${index + 1}`] = option.option;
    });

    return {
        title: poll.title,
        openGraph: {
            title: poll.title,
            images: [imageUrl],
        },
        other: {
            ...fcMetadata,
        },
        metadataBase: new URL(process.env.HOST || ''),
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const poll = (await getPoll(params.id)) ?? NULL_POLL;

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center py-2">
                <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-20">
                    <PollVoteForm poll={poll} />
                </main>
            </div>
        </>
    );
}
