import type { Undefinable } from '@almighty-shogun/utils';
import { HttpBaseResponse, type DefaultErrorResponse, type HttpStatus } from '@almighty-shogun/http-core';

export default function (status: HttpStatus, message: string, format: DefaultErrorResponse, headers?: Undefinable<HeadersInit>): Response {
    if (format === 'json') {
        return HttpBaseResponse.custom(JSON.stringify({ status, error: message }), status, {
            headers,
            contentType: 'application/json; charset=utf-8'
        }).unwrap();
    }

    if (format === 'text') {
        return HttpBaseResponse.custom(message, status, {
            headers,
            contentType: 'text/plain; charset=utf-8'
        }).unwrap();
    }

    return HttpBaseResponse.custom(null, status, { headers }).unwrap();
}
