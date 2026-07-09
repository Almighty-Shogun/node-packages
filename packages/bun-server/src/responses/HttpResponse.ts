import FileHttpResponse from './FileHttpResponse';
import HtmlHttpResponse from './HtmlHttpResponse';
import JsonHttpResponse from './JsonHttpResponse';
import TextHttpResponse from './TextHttpResponse';
import CreatedHttpResponse from './CreatedHttpResponse';
import NotFoundHttpResponse from './NotFoundHttpResponse';
import ForbiddenHttpResponse from './ForbiddenHttpResponse';
import NoContentHttpResponse from './NoContentHttpResponse';
import { HttpStatus, type ImageContentType } from '../types';

export default class HttpResponse {
    json<T = unknown>(data: T, status: HttpStatus = HttpStatus.Ok, headers?: HeadersInit): JsonHttpResponse<T> {
        return new JsonHttpResponse(data, status, headers);
    }

    html(html: string, status: HttpStatus = HttpStatus.Ok, headers?: HeadersInit): HtmlHttpResponse {
        return new HtmlHttpResponse(html, status, headers);
    }

    text(text: string, status: HttpStatus = HttpStatus.Ok, headers?: HeadersInit): TextHttpResponse {
        return new TextHttpResponse(text, status, headers);
    }

    file(source: string | Blob, status: HttpStatus = HttpStatus.Ok, headers?: HeadersInit, contentType?: string): FileHttpResponse {
        return new FileHttpResponse(source, status, headers, contentType);
    }

    image(source: string | Blob, status: HttpStatus = HttpStatus.Ok, headers?: HeadersInit, contentType?: ImageContentType): FileHttpResponse {
        return new FileHttpResponse(source, status, headers, contentType);
    }

    forbidden(headers?: HeadersInit): ForbiddenHttpResponse {
        return new ForbiddenHttpResponse(headers);
    }

    notFound(headers?: HeadersInit): NotFoundHttpResponse {
        return new NotFoundHttpResponse(headers);
    }

    created(headers?: HeadersInit): CreatedHttpResponse {
        return new CreatedHttpResponse(headers);
    }

    noContent(headers?: HeadersInit): NoContentHttpResponse {
        return new NoContentHttpResponse(headers);
    }
}
