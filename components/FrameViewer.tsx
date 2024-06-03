'use client';

import { useEffect, useState } from "react";

import { IS_PRODUCTION } from "@/constants";

// NOTICE: Just for development
export function FrameViewer() {
    const [img, setImg] = useState<string | null>('');

    useEffect(() => {
        const imageMeta = document.querySelector<HTMLMetaElement>('meta[name="of:image"]');
        setImg(imageMeta?.getAttribute('content') ?? null)
    }, [])

    if (IS_PRODUCTION) {
        return null
    }

    return (
        <div>
            {img ? <img src={img} /> : null}
        </div>
    )
}
