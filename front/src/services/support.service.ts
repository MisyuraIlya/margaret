import axios from "axios"

export const SupportService = {
    async sendSupport(obj:ISupportDto): Promise<ApiResponse> {
        const response = await axios.post(`${process.env.REACT_APP_API}/support/send`, obj)
        return response.data
    },
} 