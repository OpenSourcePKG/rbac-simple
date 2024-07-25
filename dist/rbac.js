"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rbac = void 0;
class Rbac {
    _roles;
    _rights;
    _associations;
    constructor(_roles, _rights, _associations) {
        this._roles = _roles;
        this._rights = _rights;
        this._associations = _associations;
    }
    checkAccess(_role, _right) {
        for (const possibleRight of this.getPossibleRights(_right)) {
            const associations = this.getAssociationsByRole(_role);
            if (associations !== null && associations.includes(possibleRight)) {
                return true;
            }
        }
        return false;
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
    getAssociationsByRole(_role) {
        if (_role in this._associations) {
            return this._associations[_role];
        }
        return null;
    }
    checkRight(_right) {
        return this.traverse(_right, this._rights, () => {
            return [true];
        }, (_rights) => {
            return Boolean(_rights);
        }, () => {
            return [true];
        }, [false])
            .every((_val) => _val);
    }
    checkRole(_role) {
        return this._roles.includes(_role);
    }
    traverse(_right, _rights, _rightCb, _rightsCheckCb, _rightsCb, _default) {
        for (const right of Object.keys(_rights)) {
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
exports.Rbac = Rbac;
