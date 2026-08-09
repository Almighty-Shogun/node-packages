import { HttpBaseResponse } from '../responses';
import type { Undefinable } from '@almighty-shogun/utils';
import type { DefaultErrorResponse, HttpStatus } from '../types';

export default function (status: HttpStatus, message: string, format: DefaultErrorResponse, headers?: Undefinable<HeadersInit>): Response {
    if (format === 'json') {
        return HttpBaseResponse.json({ status, error: message }, { status, headers }).unwrap();
    }

    if (format === 'text') {
        return HttpBaseResponse.text(message, { status, headers }).unwrap();
    }

    return new Response(null, {
        status,
        headers
    });
}
