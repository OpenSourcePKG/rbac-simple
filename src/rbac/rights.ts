export type TRights<Right extends string> = {
  [key in Right]?: TRights<Right>;
};
type TRightCb<Right extends string, T> = (_right: Right) => T[];
type TRightsCheckCb<T> = (_rights: T[]) => boolean;
type TRightsCb<Right extends string, T> = (
  _right: Right,
  _rights: T[]
) => T[];

export class Rights<Right extends string> {

  public constructor(private readonly _rights: TRights<Right>) {
  }

  public check(_right: Right): boolean {
    return this.traverse(_right, this._rights, () => {
      return [true];
    }, (_rights) => {
      return Boolean(_rights);
    }, () => {
      return [true];
    }, [false])
    .every((_val) => _val);
  }

  public getPossibleRights(_right: Right): Right[] {
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

  public getRights(): TRights<Right> {
    return this._rights;
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