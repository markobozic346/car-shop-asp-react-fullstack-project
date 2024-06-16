import { api } from "@/services/api"
import { Car, CarBody } from "./types";
import { TOKEN_KEY } from "./constants";


// PUBLIC QUERIES

export const getAllCars = async (): Promise<Car[]> => {
    
    const res = await api({
        endpoint: "Car"
    })

    return res.data
}

export const getAllCarBodyTypes = async (): Promise<CarBody[]> => {

    const res = await api({
        endpoint: "CarBody"
    })

    return res.data
}

export const getCarBodyType = async ({carBodyId}: {carBodyId: number}): Promise<CarBody> => {

    const res = await api({
        endpoint: `CarBody/${carBodyId}`
    })

    return res.data;
}


// AUTHENTICATED QUERIES

export const getMyCars = async (): Promise<Car[]> => {

    const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")

    const res = await api({
        endpoint: "Car/mycars", config: {
            headers: {
            Authorization: `Bearer ${jwt}`
        }
    } })
    
    return res.data;
}

