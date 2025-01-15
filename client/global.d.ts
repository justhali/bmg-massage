declare interface Window {
    SumUpCard: {
        mount: (options: {
            id: string;
            checkoutId: string;
            onResponse: (type: string, body: any) => void;
        }) => void;
        unmount: (id: string) => void;
    };
}