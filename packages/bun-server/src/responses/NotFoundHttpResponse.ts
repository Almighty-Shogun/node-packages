import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class NotFoundHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit) {
        super(null, HttpStatus.NotFound, headers);
    }
}
