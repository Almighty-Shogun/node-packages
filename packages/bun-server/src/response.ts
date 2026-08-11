import { HttpBaseResponse, type CoreOptions } from '@almighty-shogun/http-core';
import type { NullableOrUndefinable, Undefinable } from '@almighty-shogun/utils';

type BaseOptions = CoreOptions & {
    contentType?: Undefinable<string>;
};

export default class HttpResponse extends HttpBaseResponse {
    public static file(
        body: NullableOrUndefinable<string | Blob> = null,
        options: NullableOrUndefinable<BaseOptions> = null
    ): HttpBaseResponse {
        const { status, headers } = this.resolveCoreOptions(options);
        const contentType = options?.contentType ?? null;

        const file = typeof body === 'string'
            ? contentType ? Bun.file(body, { type: contentType }) : Bun.file(body)
            : body;

        return new HttpResponse(file, status, headers, contentType);
    }
}
