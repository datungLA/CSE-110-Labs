export enum Label {
    personal = "personal",
    study = "study",
    work = "work",
    other = "other",
}

export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    liked: boolean;
}

export type FavoriteButtonProps = {
    note: Note;
    toggleFavorite: (id: number) => void;
};

export type FavoriteListProps = {
    notes: Note[];
};