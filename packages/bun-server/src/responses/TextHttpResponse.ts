import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class TextHttpResponse extends HttpBaseResponse {
    constructor(text: string, status: HttpStatus, headers?: HeadersInit) {
        super(text, status, headers, 'text/plain; charset=utf-8');
    }
}
