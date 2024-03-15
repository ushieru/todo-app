export class DomainError extends Error {
    constructor(
        readonly status: number,
        readonly message: string,
    ) { super() }
}
