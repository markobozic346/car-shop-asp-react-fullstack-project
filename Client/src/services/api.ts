import axios from "axios";

export const api = ({endpoint, config }: {endpoint: string, config?: Parameters<typeof axios>[1]}) => {
    return axios(`https://localhost:44335/${endpoint}`, config)
        
}
