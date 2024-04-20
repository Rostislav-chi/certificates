import { BadRequestError } from "./errors";

export enum StatusCodes {
    OK = 200,
    AUTH_ERR = 401,
    FORBIDDEN_ERR = 403,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERR = 500,
    CONFIG_ERROR = 412,
}

export type HttpRequest = {
    query: {
        [key: string]: string;
    };
    body: any;
    params: {
        [key: string]: string;
    };
    headers: {
        [key: string]: string;
    };
    http: {
        [key: string]: string;
    };
    authorizer: {
        [key: string]: string;
    };
};

export type HttpResponse = {
    statusCode: number;
    body: string;
    headers: { [key: string]: any };
};

export function getHttpRequest(event: any): HttpRequest {
    let query = {};
    let body = {};
    let params = {};
    let headers = {};
    let http = {};
    let authorizer = {};

    if (event.body) {
        body = JSON.parse(event.body);
    }

    if (event.queryStringParameters) {
        query = event.queryStringParameters;
    }
    if (event.pathParameters) {
        params = event.pathParameters;
    }

    if (event.headers) {
        headers = event.headers;
    }

    if (event.requestContext.http) {
        http = event.requestContext.http;
    }

    if (event.requestContext.authorizer) {
        if (process.env.ENV === "offline")
            authorizer = event.requestContext.authorizer;
        else authorizer = event.requestContext.authorizer.lambda;
    }

    return {
        query,
        body,
        params,
        headers,
        http,
        authorizer,
    };
}

export function getHttpResponse(
    statusCode: StatusCodes,
    responseObj: any
): HttpResponse {
    return {
        statusCode,
        body: JSON.stringify(responseObj),
        headers: {
            "Access-Control-Allow-Origin": process.env.CORS_ALLOW_ORIGIN,
            "Access-Control-Allow-Methods": "*",
        },
    };
}

async function baseHandleRequest(
    RequestModelType: new (req: any) => any,
    handlerFunc: (params: any) => any,
    event: any
): Promise<any> {
    const req = getHttpRequest(event);

    let requestModel = {};
    try {
        requestModel = new RequestModelType(req);
    } catch (error) {
        throw new BadRequestError("Error while building request model");
    }
    const responseModel = await handlerFunc(requestModel);
    return getHttpResponse(StatusCodes.OK, responseModel);
}

export async function handleRequestNoRoleCheck(
    RequestModelType: new (req: any) => any,
    handlerFunc: (params: any) => any,
    event: any
): Promise<any> {
    return baseHandleRequest(RequestModelType, handlerFunc, event);
}
