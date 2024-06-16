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