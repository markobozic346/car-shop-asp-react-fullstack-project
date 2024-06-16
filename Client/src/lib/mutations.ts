import { api } from "@/services/api";
import { TOKEN_KEY } from "./constants";
import { Car, User } from "./types";

export const createCar = async ({car}: {car: Omit<Car, 'id' | 'userId'>}): Promise<Car[]> => {

    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: "Car", config: {
            method: 'POST',
            data: car,
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data;
}

export const deleteCar = async ({ carId }: { carId: number }) => {
    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Car/${carId}`, config: {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data;
}

export const updateCar = async ({ car }: { car: Car }) => {
     const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Car/${car.id}`, config: {
            method: 'PUT',
            data: car,
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data;
}

// ADMIN MUTATIONS

export const deleteUserAdmin = async ({ userId }: { userId: number }) => {
     const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Admin/users/${userId}`, config: {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data
}

export const updateUserAdmin = async ({ user }: { user: User }) => {
     const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Admin/users/${user.id}`, config: {
            method: 'PUT',
            data: user,
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data;
}