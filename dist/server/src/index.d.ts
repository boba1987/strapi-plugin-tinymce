declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => Promise<void>;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        config: {
            getConfig: (ctx: any) => Promise<void>;
        };
        settings: {
            getSettings: (ctx: any) => Promise<void>;
            setSettings: (ctx: any) => Promise<void>;
        };
    };
    routes: {
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
    services: {
        config: ({ strapi }: {
            strapi: any;
        }) => {
            getConfig(key?: string): any;
        };
        settings: () => {
            getSettings(): Promise<unknown>;
            setSettings(settings: any): Promise<unknown>;
        };
    };
    contentTypes: {};
    policies: {};
    middlewares: {};
};
export default _default;
