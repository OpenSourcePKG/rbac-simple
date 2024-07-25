type TRights<Right extends string> = {
  [key in Right]?: TRights<Right>;
};
type TRightCb<Right extends string, T> = (_right: Right) => T[];
type TRightsCheckCb<T> = (_rights: T[]) => boolean;
type TRightsCb<Right extends string, T> = (
  _right: Right,
  _rights: T[]
) => T[];
type TAssociations<Role extends string, Right extends string> = {
  [key in Role]: Right[];
};

export class Rbac<Role extends string, Right extends string> {

  public constructor(
    private readonly _roles: Role[],
    private readonly _rights: TRights<Right>,
    private readonly _associations: TAssociations<Role, Right>
  ) {
  }

  public checkAccess(
    _role: Role,
    _right: Right
  ): boolean {
    for (const possibleRight of this.getPossibleRights(_right)) {
      const associations = this.getAssociationsByRole(_role);
      if (associations !== null && associations.includes(possibleRight)) {
        return true;
      }
    }

    return false;
  }

  protected getPossibleRights(_right: Right): Right[] {
    return this.traverse(_right, this._rights, (_right2) => {
      return [_right2];
    }, (_rights) => {
      return _rights.length > 0;
    }, (
      _right2,
      _rights
    ) => {
      return [
        _right2,
        ..._rights
      ];
    }, []);
  }

  protected getAssociationsByRole(_role: Role): Right[] | null {
    if (_role in this._associations) {
      return this._associations[_role];
    }
    return null;
  }

  protected checkRight(_right: Right): boolean {
    return this.traverse(_right, this._rights, () => {
      return [true];
    }, (_rights) => {
      return Boolean(_rights);
    }, () => {
      return [true];
    }, [false])
    .every((_val) => _val);
  }

  protected checkRole(_role: Role): boolean {
    return this._roles.includes(_role);
  }

  private traverse<T>(
    _right: Right,
    _rights: TRights<Right>,
    _rightCb: TRightCb<Right, T>,
    _rightsCheckCb: TRightsCheckCb<T>,
    _rightsCb: TRightsCb<Right, T>,
    _default: T[]
  ): T[] {
    for (const right of Object.keys(_rights) as Right[]) {
      if (_right === right) {
        return _rightCb(right);
      }

      const subRights = _rights[right];

      if (subRights && Object.keys(subRights).length > 0) {
        const result = this.traverse(_right, subRights, _rightCb, _rightsCheckCb, _rightsCb, _default);
        if (_rightsCheckCb(result)) {
          return _rightsCb(right, result);
        }
      }
    }

    return _default;
  }

}