'use client';

import { useEffect } from "react";
import urlcat from "urlcat";

import { FIREFLY_WEB_ROOT } from "@/constants";

interface RedirectProfileProps {
    profileUrl?: string;
}

const isValidProfileUrl = (profileUrl: string) => {
    return profileUrl.startsWith('/profile/')
};

export function RedirectProfile({ profileUrl }: RedirectProfileProps) {

    useEffect(() => {
        window.location.href = urlcat(
            FIREFLY_WEB_ROOT,
            profileUrl && isValidProfileUrl(profileUrl) ? profileUrl : ''
        )
    }, [profileUrl])

    return null;
}