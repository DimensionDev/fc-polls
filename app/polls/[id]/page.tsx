import { Metadata } from 'next';

import { PollVoteForm } from '@/app/form';
import { PER_USER_VOTE_LIMIT, POLL_STATUS } from '@/constants';
import { HOST } from '@/constants/env';
import { IMAGE_QUERY_SCHEMA } from '@/constants/zod';
import { createFrameMetaDataFromPoll } from '@/helpers/createFrameMetaDataFromPoll';
import { createNullPoll } from '@/helpers/createNullPoll';
import { getPoll } from '@/services/getPoll';

interface MetadataProps {
    params: { id: string };
    searchParams: { [key: string]: string };
}

export async function generateMetadata({ params, searchParams }: MetadataProps): Promise<Metadata> {
    const queryData = IMAGE_QUERY_SCHEMA.parse({
        ...searchParams,
        id: params.id,
    });
    const poll = (await getPoll(queryData.id, queryData.userId)) ?? createNullPoll();
    const votedOptions = poll.options.filter((opt) => opt.voted);

    const { openGraph, frameMetaList } = createFrameMetaDataFromPoll(
        poll,
        queryData,
        poll.status !== POLL_STATUS.ACTIVE || votedOptions.length >= PER_USER_VOTE_LIMIT,
    );

    return {
        title: poll.title,
        openGraph,
        other: frameMetaList.reduce<Metadata['other']>((acc, meta) => {
            acc![meta.name] = meta.content;
            return acc;
        }, {}),
        metadataBase: new URL(HOST || ''),
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const poll = (await getPoll(params.id)) ?? createNullPoll();

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
