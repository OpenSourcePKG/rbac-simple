export type TRights = {
  [key: string]: TRights | string;
};
type TRightCb<T> = (_right: string) => T;
type TRightsCheckCb<T> = (_rights: T) => boolean;
type TRightsCb<T> = (
  _right: string,
  _rights: T
) => T;

export class Rights {

  public constructor(private readonly _rights: TRights) {
  }

  public check(_right: string): boolean {
    return this.traverse(_right, this._rights, () => {
      return true;
    }, (_rights: boolean) => {
      return Boolean(_rights);
    }, () => {
      return true;
    }, false);
  }

  public getPossibleRights(_right: string): string[] {
    return this.traverse(_right, this._rights, (_right2: string) => {
      return [_right2];
    }, (_rights: string[]) => {
      return _rights.length > 0;
    }, (
      _right2: string,
      _rights: string[]
    ) => {
      return [
        _right2,
        ..._rights
      ];
    }, []);
  }

  public getRights(): TRights {
    return this._rights;
  }

  private traverse<T>(
    _right: string,
    _rights: TRights,
    _rightCb: TRightCb<T>,
    _rightsCheckCb: TRightsCheckCb<T>,
    _rightsCb: TRightsCb<T>,
    _default: T
  ): T {
    for (const right of Object.keys(_rights)) {
      if (_right === right) {
        return _rightCb(right);
      }

      const subRights = _rights[right];

      if (typeof subRights !== 'string' && Object.keys(subRights).length > 0) {
        const result = this.traverse(_right, subRights, _rightCb, _rightsCheckCb, _rightsCb, _default);
        if (_rightsCheckCb(result)) {
          return _rightsCb(right, result);
        }
      }
    }

    return _default;
  }

}