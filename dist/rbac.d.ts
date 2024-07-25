type TRights<Right extends string> = {
    [key in Right]?: TRights<Right>;
};
type TAssociations<Role extends string, Right extends string> = {
    [key in Role]: Right[];
};
export declare class Rbac<Role extends string, Right extends string> {
    private readonly _roles;
    private readonly _rights;
    private readonly _associations;
    constructor(_roles: Role[], _rights: TRights<Right>, _associations: TAssociations<Role, Right>);
    checkAccess(_role: Role, _right: Right): boolean;
    protected getPossibleRights(_right: Right): Right[];
    protected getAssociationsByRole(_role: Role): Right[] | null;
    protected checkRight(_right: Right): boolean;
    protected checkRole(_role: Role): boolean;
    private traverse;
}
export {};
