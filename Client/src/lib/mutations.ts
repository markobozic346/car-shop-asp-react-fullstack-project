import { api } from "@/services/api";
import { TOKEN_KEY } from "./constants";
import { Car } from "./types";

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
        endpoint: `Car`, config: {
            method: 'PUT',
            data: car,
            headers: {
            Authorization: `Bearer ${jwt}`
            },
    } })
    
    return res.data;
}