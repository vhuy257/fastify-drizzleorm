declare class Logger {
    static info(prefix: string, message: string): void;
    static error(prefix: string, message: string): void;
    static success(prefix: string, message: string): void;
}
export { Logger };
