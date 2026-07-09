import HttpBaseResponse from './HttpBaseResponse';
import { HttpStatus, type RedirectHttpStatus } from '../types';

export default class RedirectHttpResponse extends HttpBaseResponse {
    constructor(location: string | URL, status: RedirectHttpStatus = HttpStatus.Found, headers?: HeadersInit) {
        const responseHeaders = new Headers(headers);

        responseHeaders.set('Location', location.toString());

        super(null, status, responseHeaders);
    }
}
