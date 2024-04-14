export type NameDescription = {
    name: string;
    description: string;
};

export type IdNameDescription = NameDescription & {
    id: string | number;
}