---
outline: deep

returns: An `HttpBaseResponse` wrapper that can be returned by route handlers and unwrapped into a native `Response`.
---

# HttpBaseResponse

Response wrapper shared by the server packages. It centralizes native `Response` creation, exposes `status` and `headers`, and provides static factory methods for common response shapes.

Route handlers return this wrapper. The server unwraps it before handing the native `Response` to the runtime. The constructor is `protected`, so application code never calls `new HttpBaseResponse()`; instances come from the static factory methods below, reached either through the class itself or through the `response` argument passed to route handlers.

Most factories take the response body first and an optional options object second. Which option fields are accepted depends on the method.

## Importing

```ts
import { HttpBaseResponse } from '@almighty-shogun/http-core';
```

## Usage

```ts
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/http-core';

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
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/http-core';

const response = HttpBaseResponse.custom('Locked', HttpStatus.Locked, {
    contentType: 'text/plain; charset=utf-8'
});
```

Use `json()`, `html()`, and `text()` when the content type is known from the method. They accept [`CoreOptions`](../types#coreoptions), so callers can override `status` and `headers`.

Use `image()` when the body is image data. It accepts [`ImageOptions`](../types#imageoptions), whose `contentType` is restricted to [`ImageContentType`](../types#imagecontenttype).

```ts
import { HttpBaseResponse } from '@almighty-shogun/http-core';

const markup = '<svg xmlns="http://www.w3.org/2000/svg"/>';

const chart = HttpBaseResponse.image(markup, {
    contentType: 'image/svg+xml'
});
```

Use the named status helpers when the status should be fixed by the method name: `ok()`, `created()`, `accepted()`, `badRequest()`, `unauthorized()`, `forbidden()`, `notFound()`, `notAllowed()`, `conflict()`, `unprocessableEntity()`, `tooManyRequests()`, and `internalServerError()`. These methods accept [`FixedStatusOptions`](../types#fixedstatusoptions), so they allow headers and content type but not a status override.

`noContent()` always returns `204 No Content` and `notModified()` always returns `304 Not Modified`. Neither carries a body, so they take options only and their first argument is the options object rather than a body. `redirect()` sets the `Location` header and defaults to `302 Found`; it accepts [`RedirectOptions`](../types#redirectoptions), whose status is restricted to [`RedirectHttpStatus`](../types#redirecthttpstatus).

## Failure handling

`json()` serializes the body with `JSON.stringify()`. When serialization fails, for example because the value contains circular references or unsupported values, it throws an [`InvalidJsonBodyError`](../errors#invalidjsonbodyerror) carrying the original `TypeError` as its cause.

## Extending

The constructor is `protected` rather than private, so a server package can subclass the class to add a runtime-specific factory. [`@almighty-shogun/bun-server`](../../bun-server/responses/HttpResponse) does this in its [`HttpResponse`](../../bun-server/responses/HttpResponse) to add `file()`, which resolves a path through `Bun.file()`.

A subclass inherits every factory above, and those inherited methods keep returning the `http-core` class rather than the subclass. That is deliberate: it is what lets a server check a handler result with a single `instanceof` regardless of which factory produced it.

<FrontmatterDocs/>

## Uses

- [CoreOptions](../types#coreoptions)
- [FixedStatusOptions](../types#fixedstatusoptions)
- [HttpStatus](../types#httpstatus)
- [ImageOptions](../types#imageoptions)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [RedirectOptions](../types#redirectoptions)

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

    static image(
        body?: NullableOrUndefinable<BodyInit>,
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
        options?: NullableOrUndefinable<CoreOptions>
    ): HttpBaseResponse;

    static notModified(
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

    static tooManyRequests(
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

    protected static fixed(
        body: NullableOrUndefinable<BodyInit>,
        status: HttpStatus,
        options: NullableOrUndefinable<FixedStatusOptions>
    ): HttpBaseResponse;

    protected static resolveCoreOptions(
        options: NullableOrUndefinable<CoreOptions>
    ): Required<CoreOptions>;
}
```
