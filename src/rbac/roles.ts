export type TRoles<R> = R[];

export class Roles<R extends string> {

  public constructor(private readonly _roles: TRoles<R>) {
  }

  public [Symbol.iterator](): IterableIterator<string> {
    return this._roles[Symbol.iterator]();
  }

  public check(_role: R): boolean {
    return this._roles.includes(_role);
  }

  public getRoles(): TRoles<R> {
    return this._roles;
  }

}