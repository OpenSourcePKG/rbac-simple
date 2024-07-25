import {Rights, TRights} from './rbac/rights.js';
import {Roles, TRoles} from './rbac/roles.js';

export type TAssociations = {
  [key: string]: string[];
};

export class Rbac<R extends string> {

  public constructor(
    private readonly _roles: Roles<R>,
    private readonly _rights: Rights,
    private readonly _associations: TAssociations
  ) {
  }

  public check(
    _role: R,
    _right: string
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

  public getAssociationsByRole(_role: string): string[] | null {
    if (_role in this._associations) {
      return this._associations[_role];
    }
    return null;
  }

  public getRights(): TRights {
    return this._rights.getRights();
  }

  public getRoles(): TRoles<R> {
    return this._roles.getRoles();
  }

}