'use client';

import { IS_PRODUCTION } from '@/constants';
import { collectFrameDataFromDocument } from '@/helpers/collectFrameDataFromDocument';

// NOTICE: Just for development
export function FrameViewer() {
    const frameData = collectFrameDataFromDocument();

    if (IS_PRODUCTION || !frameData) {
        return null;
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="h-[400px] w-[600px]">
                <img src={frameData.image} alt="Polls" />
            </div>
            <div className="mt-4 flex">
                {frameData.buttons.map((button) => (
                    <button key={button.index} className="mx-2 rounded-md bg-blue-500 px-4 py-2 text-white">
                        {button.text}
                    </button>
                ))}
            </div>
        </div>
    );
}
