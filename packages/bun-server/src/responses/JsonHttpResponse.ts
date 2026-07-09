import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class JsonHttpResponse<T = unknown> extends HttpBaseResponse {
    constructor(data: T, status: HttpStatus, headers?: HeadersInit) {
        super(JSON.stringify(data), status, headers, 'application/json; charset=utf-8');
    }
}
