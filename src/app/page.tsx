import { PollCreator } from '@/components/PollCreator';

export const metadata = {
    title: 'Farcaster polls',
    description: 'Poll example for farcaster',
};

export default async function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <PollCreator />
        </div>
    );
}
