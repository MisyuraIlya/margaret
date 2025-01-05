import axios from 'axios'

export const TerritoryService = {
  async getTerritory(): Promise<ITerritory[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/territory`)
    return response.data
  },
}
