declare const _default: {
    config: {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                policies: any[];
            };
        }[];
    };
    settings: {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                policies: any[];
                auth: boolean;
            };
        }[];
    };
};
export default _default;
