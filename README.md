# Open Frames Poll App

- A poll frame app built with [Framesjs](https://framesjs.org/) and [Open Frames](https://github.com/open-frames/standard)
- Supported Farcaster frame(fc:frame) and Lens frame(of: supported with open frames)

## Type Description

```TypeScript
enum IMAGE_THEME {
    Dark = 'dark',
    Light = 'light',
}
enum LOCALE {
    en = 'en',
    zhHans = 'zh-Hans',
    zhHant = 'zh-Hant',
}
enum FRAME_SOURCE {
    Lens = 'lens',
    Farcaster = 'farcaster',
}
const QUERY_SHAPE = z.object({
    id: z.string(), // poll id
    profileId: z.string().optional(), // profile id
    date: z.string().optional(), // Date.now, when error happened we change this and redirect with no cache
    theme: z.nativeEnum(IMAGE_THEME).optional().default(IMAGE_THEME.Light).catch(IMAGE_THEME.Light), // theme of frame image
    locale: z.nativeEnum(LOCALE).optional().default(LOCALE.en).catch(LOCALE.en), // locale of frame image
    source: z.nativeEnum(FRAME_SOURCE).default(FRAME_SOURCE.Farcaster), // supported platform
})
```

## API

### /polls/:pollId

- The entry of poll frame.
- **parameters**
  - path parameters
    - pollId: the poll id
  - search parameters
    - [QUERY_SHAPE](#type-description)
- **response**: html with frame meta labels

### /api/frames

- Called by [/polls/:pollId](#pollspollid). You can also call it separately as you need
- **parameters**
  - search parameters
    - [QUERY_SHAPE](#type-description)
- **response**: html with frame meta labels

### /api/frames/vote

- Vote api. Called when user select option
- **parameters**

  - search parameters
    - [QUERY_SHAPE](#type-description)
  - body: Frame Action Shape

    - Farcaster:

            ```TypeScript
            const requestBody = {
                untrustedData: {
                    fid: 1, // farcaster profile id
                    url: frame.url, // frame url
                    messageHash: messageDataHash,
                    timestamp: messageData.timestamp,
                    network: messageData.network,
                    buttonIndex: index,
                    inputText: input,
                    state: additional?.state,
                    transactionId: additional?.transactionId,
                    castId: {
                        fid: messageData.fid,
                        hash: postId, // such as postId
                    }
                },
                trustedData: {
                    messageBytes: signature, // Signed by current profile
                }
            }
            ```

    - Lens:

            ```TypeScript
            const plainData = {
                actionResponse: '0x',
                buttonIndex: 1,
                inputText: '',
                profileId: '0x',
                pubId: '0x-0x', // such as postId
                // The EIP-721 spec version, must be 1.0.0
                specVersion: '1.0.0',
                state: '',
                url: 'https://your-frame-url.com',
            };
            const requestBody = {
                clientProtocol: 'lens@1.0.0',
                untrustedData: {
                    ...plainData,
                    deadline: Date.now() + (1000 * 60 * 10), // timestamp: such as 10 minutes from now
                    identityToken: '', // use this to validate lens profile
                },
                trustedData: {
                    messageBytes: signature, // Signed by current profile with plainData
                },
            }
            ```

- **response**: html with frame meta labels

### /api/frames/images

- Internal call. _Do not call separately_
- response: frame image

## Demo

- [https://firefly.mask.social/](https://firefly.mask.social/)(**Official**)
- [https://polls.mask.social/](https://polls.mask.social/)
