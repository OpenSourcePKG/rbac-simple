import {Rights, TRights} from './rbac/rights.js';
import {Roles, TRoles} from './rbac/roles.js';

export type TAssociations<Role extends string, Right extends string> = {
  [key in Role]: Right[];
};

export class Rbac<Role extends string, Right extends string> {

  public constructor(
    private readonly _roles: Roles<Role>,
    private readonly _rights: Rights<Right>,
    private readonly _associations: TAssociations<Role, Right>
  ) {
  }

  public check(
    _role: Role,
    _right: Right
  ): boolean {
    if (!this._roles.check(_role)) {
      throw new Error(`role "${_role}" is not defined`);
    }
    if (!this._rights.check(_right)) {
      throw new Error(`right "${_right}" is not defined`);
    }

    const possibleRights = this._rights.getPossibleRights(_right);

    for (const possibleRight of possibleRights) {
      const associations = this.getAssociationsByRole(_role);
      if (associations !== null && associations.includes(possibleRight)) {
        return true;
      }
    }

    return false;
  }

  public getAssociationsByRole(_role: Role): Right[] | null {
    if (_role in this._associations) {
      return this._associations[_role];
    }
    return null;
  }

  public getRights(): TRights<Right> {
    return this._rights.getRights();
  }

  public getRoles(): TRoles<Role> {
    return this._roles.getRoles();
  }

}