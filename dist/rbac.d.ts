import { Rights, TRights } from './rbac/rights.js';
import { Roles, TRoles } from './rbac/roles.js';
export type TAssociations<Role extends string, Right extends string> = {
    [key in Role]: Right[];
};
export declare class Rbac<Role extends string, Right extends string> {
    private readonly _roles;
    private readonly _rights;
    private readonly _associations;
    constructor(_roles: Roles<Role>, _rights: Rights<Right>, _associations: TAssociations<Role, Right>);
    check(_role: Role, _right: Right): boolean;
    getAssociationsByRole(_role: Role): Right[] | null;
    getRights(): TRights<Right>;
    getRoles(): TRoles<Role>;
}
