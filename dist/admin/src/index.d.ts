declare const _default: {
    register(app: any): void;
    bootstrap(app: any): void;
    registerTrads(app: any): Promise<({
        data: {
            [x: string]: string;
        };
        locale: string;
    } | {
        data: {};
        locale: string;
    })[]>;
};
export default _default;
