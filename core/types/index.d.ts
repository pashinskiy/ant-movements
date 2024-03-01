export interface IDataValidatorError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}
