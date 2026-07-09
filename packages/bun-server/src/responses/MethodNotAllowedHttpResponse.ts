import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class MethodNotAllowedHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit) {
        super(null, HttpStatus.MethodNotAllowed, headers);
    }
}
