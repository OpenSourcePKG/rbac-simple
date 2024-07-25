export type TRoles<R> = R[];
export declare class Roles<Role extends string> {
    private readonly _roles;
    constructor(_roles: TRoles<Role>);
    [Symbol.iterator](): IterableIterator<string>;
    check(_role: Role): boolean;
    getRoles(): TRoles<Role>;
}
