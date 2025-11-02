export type PostInput = {
    title: string;
    content:string;
}

export type Post = {
    id: number;
    title: string;
    content:string;
    createdAt:Date;
    updatedAt:Date;
}

export type TitleAndDate = {
    title: string;
    createdAt: Date;
}



