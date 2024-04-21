export class NotFoundError extends Error {}

export class BadRequestError extends Error {}

export class ConfigurationError extends Error {}

export class UnauthorizedError extends Error {}

export class ForbiddenError extends Error {}

export class UnexpectedResultSet extends Error {}

export class BadDataError extends Error {
    message: string;
    results: string;

    constructor(message: string, results: string) {
        super();
        this.message = message;
        this.results = results;
    }
}
