export type TRoles<R> = R[];

export class Roles<Role extends string> {

  public constructor(private readonly _roles: TRoles<Role>) {
  }

  public [Symbol.iterator](): IterableIterator<string> {
    return this._roles[Symbol.iterator]();
  }

  public check(_role: Role): boolean {
    return this._roles.includes(_role);
  }

  public getRoles(): TRoles<Role> {
    return this._roles;
  }

}