import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class extends HttpBaseResponse {
    constructor(source: string | Blob, status: HttpStatus, headers?: HeadersInit, contentType?: string) {
        let file: Blob | null;

        if (typeof source === 'string') {
            file = contentType ? Bun.file(source, { type: contentType }) : Bun.file(source);
        } else {
            file = source;
        }

        super(file, status, headers, contentType ?? (file.type || undefined));
    }
}
