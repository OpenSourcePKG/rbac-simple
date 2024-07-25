export type TRights = {
    [key: string]: TRights | string;
};
export declare class Rights {
    private readonly _rights;
    constructor(_rights: TRights);
    check(_right: string): boolean;
    getPossibleRights(_right: string): string[];
    getRights(): TRights;
    private traverse;
}
