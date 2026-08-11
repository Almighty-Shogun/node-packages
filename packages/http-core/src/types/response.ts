import type { Undefinable } from '@almighty-shogun/utils';
import type { HttpStatus, ImageContentType, RedirectHttpStatus } from './http';

export type CoreOptions = {
    status?: Undefinable<HttpStatus>;
    headers?: Undefinable<HeadersInit>;
};

export type ImageOptions = CoreOptions & {
    contentType?: Undefinable<ImageContentType>;
};

export type RedirectOptions = {
    status?: Undefinable<RedirectHttpStatus>;
    headers?: Undefinable<HeadersInit>;
};

export type FixedStatusOptions = {
    headers?: Undefinable<HeadersInit>;
    contentType?: Undefinable<string>;
};
