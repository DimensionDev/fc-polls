export function FrameTips() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 px-10">
            <h1 className="text-xl font-bold">
                This page is a poll frame which supports Farcaster and Lens. And cant be accessed directly.
            </h1>
            <h1>Please use the app supports Farcaster or Lens to view this page.</h1>
            <h1>
                Or you can try this feature on our website.
                <a className="text-blue-500 underline" href="https://firefly.mask.social/">
                    https://firefly.mask.social/
                </a>
            </h1>
        </div>
    );
}
