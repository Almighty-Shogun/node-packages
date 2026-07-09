import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class NoContentHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit) {
        super(null, HttpStatus.NoContent, headers);
    }
}
