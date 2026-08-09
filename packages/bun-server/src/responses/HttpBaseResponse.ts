import type { NullableOrUndefinable, Undefinable } from '@almighty-shogun/utils';
import { HttpStatus, type ImageContentType, type RedirectHttpStatus } from '../types';

type CoreOptions = {
    status?: Undefinable<HttpStatus>;
    headers?: Undefinable<HeadersInit>;
};

type BaseOptions = CoreOptions & {
    contentType?: Undefinable<string>;
};

type ImageOptions = CoreOptions & {
    contentType?: Undefinable<ImageContentType>;
};

type RedirectOptions = {
    status?: Undefinable<RedirectHttpStatus>;
    headers?: Undefinable<HeadersInit>;
};

type FixedStatusOptions = {
    headers?: Undefinable<HeadersInit>;
    contentType?: Undefinable<string>;
};

export default class HttpBaseResponse {
    private readonly response: Response;

    protected constructor(body: NullableOrUndefinable<BodyInit> = null, status: HttpStatus = HttpStatus.Ok, headers: NullableOrUndefinable<HeadersInit> = null, contentType: NullableOrUndefinable<string> = null) {
        const responseHeaders = new Headers(headers ?? undefined);

        if (contentType) {
            responseHeaders.set('Content-Type', contentType);
        }

        this.response = new Response(body, { status, headers: responseHeaders });
    }

    public get status(): number {
        return this.response.status;
    }

    public get headers(): Headers {
        return this.response.headers;
    }

    public unwrap(): Response {
        return this.response;
    }

    public static custom(body: NullableOrUndefinable<BodyInit> = null, status: HttpStatus, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, status, options);
    }

    public static json<T = unknown>(body: NullableOrUndefinable<T> = null, options: NullableOrUndefinable<CoreOptions> = null): HttpBaseResponse {
        const { status, headers } = this.resolveCoreOptions(options);

        return new HttpBaseResponse(this.stringifyJson(body), status, headers, 'application/json; charset=utf-8');
    }

    public static html(body: NullableOrUndefinable<string> = null, options: NullableOrUndefinable<CoreOptions> = null): HttpBaseResponse {
        const { status, headers } = this.resolveCoreOptions(options);

        return new HttpBaseResponse(body, status, headers, 'text/html; charset=utf-8');
    }

    public static text(body: NullableOrUndefinable<string> = null, options: NullableOrUndefinable<CoreOptions> = null): HttpBaseResponse {
        const { status, headers } = this.resolveCoreOptions(options);

        return new HttpBaseResponse(body, status, headers, 'text/plain; charset=utf-8');
    }

    public static file(body: NullableOrUndefinable<string | Blob> = null, options: NullableOrUndefinable<BaseOptions> = null): HttpBaseResponse {
        return this.fileResponse(body, options);
    }

    public static image(body: NullableOrUndefinable<string | Blob> = null, options: NullableOrUndefinable<ImageOptions> = null): HttpBaseResponse {
        return this.fileResponse(body, options);
    }

    public static ok(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.Ok, options);
    }

    public static created(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.Created, options);
    }

    public static accepted(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.Accepted, options);
    }

    public static noContent(body: null = null, options: NullableOrUndefinable<CoreOptions> = null): HttpBaseResponse {
        const { headers } = this.resolveCoreOptions(options);

        return new HttpBaseResponse(body, HttpStatus.NoContent, headers);
    }

    public static badRequest(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.BadRequest, options);
    }

    public static unauthorized(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.Unauthorized, options);
    }

    public static forbidden(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.Forbidden, options);
    }

    public static notFound(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.NotFound, options);
    }

    public static notAllowed(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.MethodNotAllowed, options);
    }

    public static conflict(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.Conflict, options);
    }

    public static unprocessableEntity(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.UnprocessableEntity, options);
    }

    public static internalServerError(body: NullableOrUndefinable<BodyInit> = null, options: NullableOrUndefinable<FixedStatusOptions> = null): HttpBaseResponse {
        return this.fixed(body, HttpStatus.InternalServerError, options);
    }

    public static redirect(body: NullableOrUndefinable<string | URL> = null, options: NullableOrUndefinable<RedirectOptions> = null): HttpBaseResponse {
        const responseHeaders = new Headers(options?.headers ?? undefined);

        responseHeaders.set('Location', body?.toString() ?? '');

        return new HttpBaseResponse(null, options?.status ?? HttpStatus.Found, responseHeaders);
    }

    private static fileResponse(body: NullableOrUndefinable<string | Blob>, options: NullableOrUndefinable<BaseOptions>): HttpBaseResponse {
        const { status, headers, contentType } = this.resolveBaseOptions(options);

        const file = typeof body === 'string'
            ? contentType ? Bun.file(body, { type: contentType }) : Bun.file(body)
            : body;

        return new HttpBaseResponse(file, status, headers, contentType ?? (file?.type || null));
    }

    private static fixed(body: NullableOrUndefinable<BodyInit>, status: HttpStatus, options: NullableOrUndefinable<FixedStatusOptions>): HttpBaseResponse {
        return new HttpBaseResponse(body, status, options?.headers ?? null, options?.contentType ?? null);
    }

    private static resolveCoreOptions(options: NullableOrUndefinable<CoreOptions>): Required<CoreOptions> {
        return {
            status: options?.status ?? HttpStatus.Ok,
            headers: options?.headers ?? {}
        };
    }

    private static resolveBaseOptions(options: NullableOrUndefinable<BaseOptions>): Required<BaseOptions> {
        return {
            ...this.resolveCoreOptions(options),
            contentType: options?.contentType ?? ''
        };
    }

    private static stringifyJson(data: unknown): Undefinable<string> {
        try {
            return JSON.stringify(data);
        } catch (error) {
            throw new TypeError('Failed to serialize JSON response body.', { cause: error });
        }
    }
}
