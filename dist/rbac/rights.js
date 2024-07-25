"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rights = void 0;
class Rights {
    _rights;
    constructor(_rights) {
        this._rights = _rights;
    }
    check(_right) {
        return this.traverse(_right, this._rights, () => {
            return true;
        }, (_rights) => {
            return Boolean(_rights);
        }, () => {
            return true;
        }, false);
    }
    getPossibleRights(_right) {
        return this.traverse(_right, this._rights, (_right2) => {
            return [_right2];
        }, (_rights) => {
            return _rights.length > 0;
        }, (_right2, _rights) => {
            return [
                _right2,
                ..._rights
            ];
        }, []);
    }
    getRights() {
        return this._rights;
    }
    traverse(_right, _rights, _rightCb, _rightsCheckCb, _rightsCb, _default) {
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
exports.Rights = Rights;
