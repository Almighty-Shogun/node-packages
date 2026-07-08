import { HttpStatus } from '../types';

export default abstract class extends Response {
    protected constructor(body: BodyInit | null, status: HttpStatus, headers?: HeadersInit, contentType?: string) {
        const responseHeaders = new Headers(headers);

        if (contentType) {
            responseHeaders.set('Content-Type', contentType);
        }

        super(body, { status, headers: responseHeaders });
    }
}
