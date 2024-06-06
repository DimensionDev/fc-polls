
import { fetch } from '@/helpers/fetch';
import { getNextFetchers, type NextFetchersOptions } from '@/helpers/getNextFetchers';

export async function fetchJSON<T = unknown>(
    input: RequestInfo | URL,
    init?: RequestInit,
    options?: NextFetchersOptions,
): Promise<T> {
    const { noDefaultContentType = false } = options ?? {};
    const response = await fetch(
        input,
        {
            ...init,
            headers: noDefaultContentType
                ? init?.headers
                : {
                      'Content-Type': 'application/json',
                      ...init?.headers,
                  },
        },
        getNextFetchers(options),
    );
    return response.json();
}