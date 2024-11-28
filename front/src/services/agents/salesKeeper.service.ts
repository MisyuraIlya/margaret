import axios from 'axios'

export const salesKeeperService = {
  async getSalesSkeeper(
    extId: string,
  ): Promise<ISalesKeeper> {
    let apiUrl = `${process.env.REACT_APP_API}/salesKeeper/${extId}`
    const response = await axios.get(apiUrl)
    return response.data
  },

  async getSalesQuantityKeeperAlert(
    extId: string,
  ): Promise<IQuantityKeeper> {
    let apiUrl = `${process.env.REACT_APP_API}/salesQuantityKeeperAlert/${extId}`
    const response = await axios.get(apiUrl)
    return response.data
  },
}
