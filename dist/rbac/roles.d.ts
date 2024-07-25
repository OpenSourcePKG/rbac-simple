export type TRoles<R> = R[];
export declare class Roles<R extends string> {
    private readonly _roles;
    constructor(_roles: TRoles<R>);
    [Symbol.iterator](): IterableIterator<string>;
    check(_role: R): boolean;
    getRoles(): TRoles<R>;
}
