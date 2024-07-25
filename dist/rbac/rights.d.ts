export type TRights<Right extends string> = {
    [key in Right]?: TRights<Right>;
};
export declare class Rights<Right extends string> {
    private readonly _rights;
    constructor(_rights: TRights<Right>);
    check(_right: Right): boolean;
    getPossibleRights(_right: Right): Right[];
    getRights(): TRights<Right>;
    private traverse;
}
