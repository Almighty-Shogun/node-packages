---
outline: deep

returns: An `HttpBaseResponse` wrapper that can be returned by route handlers and unwrapped into a native `Response`.
---

# HttpBaseResponse

Response wrapper used by route handlers. It centralizes native `Response` creation, exposes `status` and `headers`, and provides static factory methods for common response shapes.

Route handlers return this wrapper. Compiled routes call `unwrap()` before handing the native `Response` to Bun. The constructor is `protected`, so application code never calls `new HttpBaseResponse()`; instances come from the static factory methods below, reached either through the class itself or through the `response` argument passed to [`defineRoute()`](../routing/defineRoute) handlers.

Every factory takes the response body first and an optional options object second. Which option fields are accepted depends on the method, and the four option shapes are listed in the type signature at the end of this page.

`json()` serializes the body with `JSON.stringify()`. When serialization fails, for example because the value contains circular references or unsupported values, it throws a `TypeError` with the original error as the cause.

## Importing

```ts
import { HttpBaseResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/bun-server';

const json = HttpBaseResponse.json({ ok: true });
const custom = HttpBaseResponse.custom('Accepted', HttpStatus.Accepted, {
    contentType: 'text/plain; charset=utf-8'
});
const missing = HttpBaseResponse.notFound('Missing', {
    contentType: 'text/plain; charset=utf-8'
});
const invalid = HttpBaseResponse.unprocessableEntity(
    JSON.stringify({ error: 'Invalid email address.' }),
    { contentType: 'application/json; charset=utf-8' }
);
const redirect = HttpBaseResponse.redirect('/login', {
    status: HttpStatus.TemporaryRedirect
});
const html = HttpBaseResponse.html('<h1>Created</h1>', {
    status: HttpStatus.Created
});

const native = json.unwrap();
```

## Factory methods

Use `custom()` when none of the named helpers fit. Its `status` argument is required because there is no safe default for an arbitrary response:

```ts
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/bun-server';

const response = HttpBaseResponse.custom('Locked', HttpStatus.Locked, {
    contentType: 'text/plain; charset=utf-8'
});
```

Use `json()`, `html()`, and `text()` when the content type is known from the method. They accept `CoreOptions`, so callers can override `status` and `headers`.

Use `file()` for a Bun file path or an existing `Blob`. When the body is a string, the method calls `Bun.file()`. Use `image()` when the content type should be restricted to [`ImageContentType`](../types#imagecontenttype).

Use the named status helpers when the status should be fixed by the method name: `ok()`, `created()`, `accepted()`, `badRequest()`, `unauthorized()`, `forbidden()`, `notFound()`, `notAllowed()`, `conflict()`, `unprocessableEntity()`, and `internalServerError()`. These methods accept `FixedStatusOptions`, so they allow headers and content type but not a status override.

`noContent()` always returns `204 No Content` and only accepts a `null` body. `redirect()` sets the `Location` header and defaults to `302 Found`; its status is restricted to [`RedirectHttpStatus`](../types#redirecthttpstatus).

<FrontmatterDocs/>

## Uses

- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [Undefinable](../../utils/types#undefinable)

## Type signature

```ts
declare class HttpBaseResponse {
    protected constructor(
        body?: NullableOrUndefinable<BodyInit>,
        status?: HttpStatus,
        headers?: NullableOrUndefinable<HeadersInit>,
        contentType?: NullableOrUndefinable<string>
    );

    get status(): number;
    get headers(): Headers;
    unwrap(): Response;

    static custom(
        body: NullableOrUndefinable<BodyInit>,
        status: HttpStatus,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static json<T = unknown>(
        body?: NullableOrUndefinable<T>,
        options?: NullableOrUndefinable<CoreOptions>
    ): HttpBaseResponse;

    static html(
        body?: NullableOrUndefinable<string>,
        options?: NullableOrUndefinable<CoreOptions>
    ): HttpBaseResponse;

    static text(
        body?: NullableOrUndefinable<string>,
        options?: NullableOrUndefinable<CoreOptions>
    ): HttpBaseResponse;

    static file(
        body?: NullableOrUndefinable<string | Blob>,
        options?: NullableOrUndefinable<BaseOptions>
    ): HttpBaseResponse;

    static image(
        body?: NullableOrUndefinable<string | Blob>,
        options?: NullableOrUndefinable<ImageOptions>
    ): HttpBaseResponse;

    static ok(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static created(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static accepted(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static noContent(
        body?: null,
        options?: NullableOrUndefinable<CoreOptions>
    ): HttpBaseResponse;

    static badRequest(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static unauthorized(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static forbidden(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static notFound(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static notAllowed(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static conflict(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static unprocessableEntity(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static internalServerError(
        body?: NullableOrUndefinable<BodyInit>,
        options?: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    static redirect(
        body?: NullableOrUndefinable<string | URL>,
        options?: NullableOrUndefinable<RedirectOptions>
    ): HttpBaseResponse;
}

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
```
