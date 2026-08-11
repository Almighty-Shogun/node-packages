---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/http-core`.

Every type on this page is defined here once and re-exported by [`@almighty-shogun/bun-server`](../bun-server/types) and [`@almighty-shogun/cloudflare-worker`](../cloudflare-worker/types), so a route file can import it from whichever package it already depends on.

Some signatures reuse utility types from [`@almighty-shogun/utils`](../utils/types): [`Nullable`](../utils/types#nullable) and [`Undefinable`](../utils/types#undefinable).

## DefaultErrorResponse

Controls how a server package renders the error responses it generates itself. It is accepted by [`createServer()`](../bun-server/server/createServer) and [`createWorker()`](../cloudflare-worker/worker/createWorker). Use `'json'` for a JSON body, `'text'` for a plain-text body, or `null` for an empty response body.

```ts
type DefaultErrorResponse = Nullable<'json' | 'text'>;
```

## ImageContentType

Restricts image response content types to common browser-supported image MIME types. It is the `contentType` option accepted by [`HttpBaseResponse.image()`](./helpers/response), which is also the method to use for SVG markup.

```ts
type ImageContentType =
    | 'image/avif'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp';
```

## RedirectHttpStatus

Restricts redirect responses to HTTP status codes that are valid for redirects. It is used by [`HttpBaseResponse.redirect()`](./helpers/response) so callers do not accidentally create a redirect with a non-redirect status code.

```ts
type RedirectHttpStatus =
    | HttpStatus.MovedPermanently
    | HttpStatus.Found
    | HttpStatus.SeeOther
    | HttpStatus.TemporaryRedirect
    | HttpStatus.PermanentRedirect;
```

## HttpMethod

Const object and string-literal union identifying the HTTP methods the server packages support. Pass either `HttpMethod.Get` or the equivalent `'GET'` string wherever a method is expected, such as [`defineRoute()`](../bun-server/routing/defineRoute).

```ts
declare const HttpMethod: Readonly<{
    Get: 'GET';
    Post: 'POST';
    Put: 'PUT';
    Patch: 'PATCH';
    Delete: 'DELETE';
    Head: 'HEAD';
    Options: 'OPTIONS';
}>;

type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];
```

## HttpStatus

Enum of HTTP status codes used by response factory methods. Use it instead of hard-coded numeric status values when creating responses.

```ts
enum HttpStatus {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,

    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,

    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    SwitchProxy = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,

    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,

    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511
}
```

## CoreOptions

Options accepted by the factory methods that decide their own content type, such as [`json()`](./helpers/response), [`html()`](./helpers/response), and [`text()`](./helpers/response). The status defaults to `200 OK` when it is omitted.

```ts
type CoreOptions = {
    status?: Undefinable<HttpStatus>;
    headers?: Undefinable<HeadersInit>;
};
```

## FixedStatusOptions

Options accepted by the factory methods whose status is fixed by the method name, such as [`ok()`](./helpers/response), [`notFound()`](./helpers/response), and [`custom()`](./helpers/response). Headers and a content type are allowed, but the status is not, because the method already decides it.

```ts
type FixedStatusOptions = {
    headers?: Undefinable<HeadersInit>;
    contentType?: Undefinable<string>;
};
```

## ImageOptions

Options accepted by [`image()`](./helpers/response). It extends [`CoreOptions`](#coreoptions) with a content type narrowed to [`ImageContentType`](#imagecontenttype), so an unsupported image format fails to compile.

```ts
type ImageOptions = CoreOptions & {
    contentType?: Undefinable<ImageContentType>;
};
```

## RedirectOptions

Options accepted by [`redirect()`](./helpers/response). The status is narrowed to [`RedirectHttpStatus`](#redirecthttpstatus) and defaults to `302 Found`, so only a real redirect status can be set.

```ts
type RedirectOptions = {
    status?: Undefinable<RedirectHttpStatus>;
    headers?: Undefinable<HeadersInit>;
};
```
