import type { DefaultErrorResponse, HttpStatus } from '../types';
import { JsonHttpResponse, TextHttpResponse } from '../responses';

export default function (status: HttpStatus, message: string, format: DefaultErrorResponse, headers?: HeadersInit): Response {
    if (format === 'json') {
        return new JsonHttpResponse({ status, error: message }, status, headers);
    }

    if (format === 'text') {
        return new TextHttpResponse(message, status, headers);
    }

    return new Response(null, {
        status,
        headers
    });
}
