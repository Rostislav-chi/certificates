import * as crypto from "crypto";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const algorithm = "aes-256-cbc";
const iv = "1234567890123456";

export function encryptMessageWithKey(text: string, key: string): string {
    const paddedKey = key.padStart(32, "0");

    const cipher = crypto.createCipheriv(algorithm, paddedKey, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

export function decryptMessageWithKey(
    encryptedText: string,
    key: string
): string {
    const paddedKey = key.padStart(32, "0");
    const decipher = crypto.createDecipheriv(algorithm, paddedKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}

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

export async function sendEmail(toAddress: string, message: string) {
    const mailOptions = {
        from: "mike@loopcrypto.xyz",
        to: toAddress,
        subject: "Your Personalized Code",
        text: `Code is: ${message}`,
    };

    const transport = nodemailer.createTransport({
        service: "Postmark",
        auth: {
            user: "c84d516b-26a3-4fbb-817a-23c06527857a",
            pass: "c84d516b-26a3-4fbb-817a-23c06527857a",
        },
    } as SMTPTransport.Options);

    await transport.sendMail(mailOptions);
}
