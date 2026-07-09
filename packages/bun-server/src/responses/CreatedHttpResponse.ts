import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class CreatedHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit) {
        super(null, HttpStatus.Created, headers);
    }
}
