import { PollCreator } from '@/components/PollCreator';

export const metadata = {
    title: 'Polls',
    description: 'Create and share your polls with Frame.',
};

export default async function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <PollCreator />
        </div>
    );
}
