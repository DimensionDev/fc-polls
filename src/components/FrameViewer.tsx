'use client';

import { IS_PRODUCTION } from "@/constants";
import { collectFrameDataFromDocument } from "@/helpers/collectFrameDataFromDocument";

// NOTICE: Just for development
export function FrameViewer() {
    const frameData = collectFrameDataFromDocument();

    if (IS_PRODUCTION || !frameData) {
        return null
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="w-[600px] h-[400px]">
                <img src={frameData.image} />
            </div>
            <div className="flex mt-4">
                {frameData.buttons.map((button) => (
                    <button key={button.index} className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md">
                        {button.text}
                    </button>
                ))}
            </div>
        </div>
    )
}
