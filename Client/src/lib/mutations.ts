import { api } from "@/services/api";
import { TOKEN_KEY } from "./constants";
import { Car, CarBody } from "./types";

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

export const toggleFavoriteCar = async ({ car }: { car: Car }) => {
    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Favorites/toggle`, config: {
            method: 'POST',
            data: {
                carId: car.id
            },
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

export const deleteCarAdmin = async ({ carId }: { carId: number }) => {
    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Admin/cars/${carId}`, config: {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data
}

export const updateCarAdmin = async ({ car }: { car: Car }) => {
    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Admin/cars/${car.id}`, config: {
            method: 'PUT',
            data: car,
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data;
}

export const updateCarBodyTypeAdmin = async ({ carBodyType }: {carBodyType: CarBody}) => {
    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Admin/carbodies/${carBodyType.id}`, config: {
            method: 'PUT',
            data: carBodyType,
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data

}

export const deleteFavoriteCarAdmin = async ({ carId }: { carId: number }) => {
    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: `Admin/savedcars/${carId}`, config: {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data
}