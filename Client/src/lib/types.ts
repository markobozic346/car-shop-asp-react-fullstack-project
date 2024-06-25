export type Car = {
    id: number
    model: string
    make: string
    year: number
    price: number
    userId: number
    carBodyId: number
    favoriteId?: number
    carId?: number

}

export type CarBody = {
    id: number
    type: string
}

export type User = {
    id: number
    username: string
    role: string
}