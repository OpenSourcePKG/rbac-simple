import { Rights, TRights } from './rbac/rights.js';
import { Roles, TRoles } from './rbac/roles.js';
export type TAssociations = {
    [key: string]: string[];
};
export declare class Rbac<R extends string> {
    private readonly _roles;
    private readonly _rights;
    private readonly _associations;
    constructor(_roles: Roles<R>, _rights: Rights, _associations: TAssociations);
    check(_role: R, _right: string): boolean;
    getAssociationsByRole(_role: string): string[] | null;
    getRights(): TRights;
    getRoles(): TRoles<R>;
}
