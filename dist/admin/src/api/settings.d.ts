declare const taskRequests: {
    getSettings: () => Promise<import("axios").AxiosResponse<any, any>>;
    setSettings: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
};
export default taskRequests;
