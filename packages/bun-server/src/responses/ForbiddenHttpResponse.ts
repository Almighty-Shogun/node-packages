import { HttpStatus } from '../types';
import HttpBaseResponse from './HttpBaseResponse';

export default class extends HttpBaseResponse {
    constructor(headers?: HeadersInit) {
        super(null, HttpStatus.Forbidden, headers);
    }
}
