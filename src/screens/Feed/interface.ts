export interface IFeed{
    id: number
    image: string
    small: string
    aspectRatio: number
    description: string
    authoriId: number
    author: IAuthor
}

export interface IAuthor {
    id: number
    name: string
    avatar: string
}