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

## HtmlRouteDefinition

Represents one Bun HTML import and the route path, or route paths, that should serve it. `defineHtmlRoute()` returns this shape so HTML bundles can be included in the same route collection as method routes.

The `path` property accepts an array for single-page applications or React frontends that should be served from multiple entry URLs while client-side routing handles the rest.

```ts
type HtmlRouteDefinition<Path extends string = string> = {
    readonly path: Path | readonly Path[];
    readonly bundle: HTMLBundle;
};
```

## RouteExport

Single value that can be exported from a route barrel consumed by `compileRoutes()` or `createServer()` in defined route mode. It accepts one method route definition, one HTML route definition, or a readonly array of route definitions.

Use an array when one route file should expose multiple method definitions for the same resource. Use `HtmlRouteDefinition.path` as an array when one HTML bundle should be served from multiple URLs.

```ts
type RouteExport<WebSocketData = undefined> =
    | RouteDefinition<any, HttpMethod, WebSocketData>
    | HtmlRouteDefinition<any>
    | readonly (
        | RouteDefinition<any, HttpMethod, WebSocketData>
        | HtmlRouteDefinition<any>
    )[];
```

## RouteCollection

Named route map accepted by `compileRoutes()` and by `createServer()` when `routeMode` is omitted or set to `'defined'`. Each key can point to a method route definition, an HTML route definition, or a readonly array of route definitions.

This type is intentionally based on `RouteExport` instead of a fixed `RouteDefinition<string, ...>` shape so namespace imports from a route barrel can be passed directly:

```ts
import * as routes from './routes';
import { createServer } from '@almighty-shogun/bun-server';

createServer({ routes });
```

```ts
type RouteCollection<WebSocketData = undefined> = Readonly<Record<string, RouteExport<WebSocketData>>>;
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

## NativeRouteCollection

Native Bun route map accepted by `createServer()` when `routeMode` is set to `'native'`. Use this when you already have handlers in Bun's `Bun.serve({ routes })` format and do not want `createServer()` to run `compileRoutes()`.

```ts
type NativeRouteCollection<WebSocketData = undefined> = NonNullable<
    BunServeOptions<WebSocketData>['routes']
>;
```

## RouteMode

Controls how `createServer()` interprets `options.routes`. The default `'defined'` mode compiles route definitions created with `defineRoute()`. The `'native'` mode passes Bun-compatible routes directly to `Bun.serve()`.

```ts
type RouteMode = 'defined' | 'native';
```

## CreateServerDefinedOptions

Options for the default `createServer()` route mode. `routes` is a package route collection and is compiled with `compileRoutes()` before the server is created.

```ts
type CreateServerDefinedOptions<WebSocketData = undefined> = CreateServerBaseOptions<WebSocketData> & {
    routeMode?: 'defined';
    routes: RouteCollection<WebSocketData>;
    automaticHead?: boolean;
    automaticOptions?: boolean;
};
```

## CreateServerNativeOptions

Options for native route mode. `routes` must already be in Bun's native route format and is passed through without package route compilation. Compilation-only options such as `automaticHead` and `automaticOptions` are not accepted in this mode.

```ts
type CreateServerNativeOptions<WebSocketData = undefined> = CreateServerBaseOptions<WebSocketData> & {
    routeMode: 'native';
    routes: NativeRouteCollection<WebSocketData>;
    automaticHead?: never;
    automaticOptions?: never;
};
```

## CreateServerOptions

Union of the two supported `createServer()` route modes. Omit `routeMode` for the package's defined route workflow, or set `routeMode: 'native'` when you want to provide Bun route handlers yourself.

```ts
type CreateServerOptions<WebSocketData = undefined> =
    | CreateServerDefinedOptions<WebSocketData>
    | CreateServerNativeOptions<WebSocketData>;
```
