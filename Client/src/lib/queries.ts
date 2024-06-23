import { api } from "@/services/api"
import { Car, CarBody, User } from "./types";
import { TOKEN_KEY } from "./constants";

// ADMIN QUERIS
export const getAllUsers = async (): Promise<User[]> => {

     const jwt = JSON.parse(localStorage.getItem(TOKEN_KEY) || "")
    const res = await api({
        endpoint: 'Admin/users',
        config: {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }
    })
    return res.data
}

// PUBLIC QUERIES

export const getAllCarsPaginated = async ({page, pageSize, search}: {page: number, pageSize: number, search: string}): Promise<Car[]> => {
    const res = await api({
        endpoint: 'Car/paginated',
        config: {
            params: {
                page,
                pageSize,
                search,
          }
      }
    })
    return res.data
}

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

