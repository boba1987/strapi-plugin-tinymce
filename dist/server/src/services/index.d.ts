declare const _default: {
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
export default _default;
