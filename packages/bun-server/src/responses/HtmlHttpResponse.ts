import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class extends HttpBaseResponse {
    constructor(html: string, status: HttpStatus, headers?: HeadersInit) {
        super(html, status, headers, 'text/html; charset=utf-8');
    }
}
