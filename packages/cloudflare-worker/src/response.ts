import { HttpBaseResponse, type HttpStatus } from '@almighty-shogun/http-core';

export default class HttpResponse extends HttpBaseResponse {
    public static from(response: Response): HttpBaseResponse {
        return new HttpResponse(response.body, response.status as HttpStatus, response.headers);
    }
}
