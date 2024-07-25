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
    check(_role, _right) {
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
    getAssociationsByRole(_role) {
        if (_role in this._associations) {
            return this._associations[_role];
        }
        return null;
    }
    getRights() {
        return this._rights.getRights();
    }
    getRoles() {
        return this._roles.getRoles();
    }
}
exports.Rbac = Rbac;
