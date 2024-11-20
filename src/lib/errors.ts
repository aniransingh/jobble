export class DBConnectionError extends Error {
    constructor(message = "Database connection failed") {
        super(message)
        this.name = "DB_CONNECTION_ERROR"
    }
}

export const DBConnectionErrorRedirectPath = "/error"