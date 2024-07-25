"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
class Roles {
    _roles;
    constructor(_roles) {
        this._roles = _roles;
    }
    [Symbol.iterator]() {
        return this._roles[Symbol.iterator]();
    }
    check(_role) {
        return this._roles.includes(_role);
    }
    getRoles() {
        return this._roles;
    }
}
exports.Roles = Roles;
