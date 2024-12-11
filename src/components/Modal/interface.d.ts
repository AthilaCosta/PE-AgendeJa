export interface IModal {
    title: string;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    footer: React.ReactNode;
    body: React.ReactNode;
    size?: "small" | "middle" | "large";
}