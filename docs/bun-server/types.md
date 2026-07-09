---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/bun-server`.

## DefaultErrorResponse

Controls how generated default errors are rendered by `compileRoutes()` and `createServer()`. Use `'json'` for a JSON body, `'text'` for a plain-text body, or `null` for an empty response body.

```ts
type DefaultErrorResponse = 'json' | 'text' | null;
```

## ImageContentType

Restricts image response content types to common browser-supported image MIME types. It is used by `HttpResponse.image()` while `HttpResponse.file()` accepts any string content type.

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

Restricts redirect responses to HTTP status codes that are valid for redirects. It is used by `RedirectHttpResponse` and `HttpResponse.redirect()` so callers do not accidentally create a redirect with a non-redirect status code.

```ts
type RedirectHttpStatus =
    | HttpStatus.MovedPermanently
    | HttpStatus.Found
    | HttpStatus.SeeOther
    | HttpStatus.TemporaryRedirect
    | HttpStatus.PermanentRedirect;
```

## HttpMethod

Enum used by route definitions and route compilation to identify supported HTTP methods. `compileRoutes()` also uses it when adding automatic `HEAD` and `OPTIONS` behavior.

```ts
enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Head = 'HEAD',
    Options = 'OPTIONS'
}
```

## HttpStatus

Enum of HTTP status codes used by response classes and response factory methods. Use it instead of hard-coded numeric status values when creating responses.

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

## RouteHandler

Function shape used by `defineRoute()`. A route handler receives Bun's typed request, the `HttpResponse` factory, and the active Bun server, then returns one of the package response classes synchronously or asynchronously.

```ts
type RouteHandler<Path extends string = string, WebSocketData = undefined> = (
    request: BunRequest<Path>,
    response: HttpResponse,
    server: Server<WebSocketData>
) => HttpBaseResponse | Promise<HttpBaseResponse>;
```

## RouteDefinition

Represents one route path, HTTP method, and handler pair. `defineRoute()` returns this shape and freezes it at runtime so route collections behave like static configuration.

```ts
type RouteDefinition<
    Path extends string = string,
    Method extends HttpMethod = HttpMethod,
    WebSocketData = undefined
> = {
    readonly path: Path;
    readonly method: Method;
    readonly handler: RouteHandler<Path, WebSocketData>;
};
```

## RouteCollection

Named route map accepted by `compileRoutes()` and `createServer()`. Each key can point to a single route definition or a readonly array of route definitions, which is useful for grouping multiple methods for the same resource.

```ts
type RouteCollection<WebSocketData = undefined> = Readonly<Record<string,
    | RouteDefinition<string, HttpMethod, WebSocketData>
    | readonly RouteDefinition<string, HttpMethod, WebSocketData>[]
>>;
```

## CompileRoutesOptions

Configures route compilation behavior. Automatic `HEAD` mirrors `GET` responses without a body, automatic `OPTIONS` returns `204 No Content` with an `Allow` header, and `defaultErrorResponse` controls generated error body format.

```ts
type CompileRoutesOptions = {
    automaticHead?: boolean;
    automaticOptions?: boolean;
    defaultErrorResponse?: DefaultErrorResponse;
};
```

## CreateServerOptions

Extends Bun's native serve options with a required route collection and the compilation options understood by `compileRoutes()`. All Bun serve options except `routes` can still be supplied.

```ts
type CreateServerOptions<WebSocketData = undefined> = Omit<BunServeOptions, 'routes'> & {
    routes: RouteCollection<WebSocketData>;
    automaticHead?: boolean;
    automaticOptions?: boolean;
    defaultErrorResponse?: DefaultErrorResponse;
};
```
