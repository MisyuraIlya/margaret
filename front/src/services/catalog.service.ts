import axios from 'axios'

interface GetProductPopUpData {
  status: string
  data: ProductPopUp
  message: string
}

export const CatalogServices = {
  async GetCatalog(
    lvl1: string | number,
    lvl2: string | number,
    lvl3: string | number,
    searchParams: string,
    documentType: CatalogDocumentType,
    user?: IUser,
    mode?: IDocumentType
  ): Promise<GetCatalogResponse> {
    let url = `${process.env.REACT_APP_API}/catalog/${documentType}/${lvl1}/${lvl2}/${lvl3}${searchParams}`;
    
    // Handle adding userId and mode query parameters
    if (user || mode) {
      const separator = searchParams ? '&' : '?'; // Decide whether to use '&' or '?' based on the presence of searchParams
      
      if (user) {
        url += `${separator}userId=${user.id}`;
      }
      
      if (mode) {
        url += `${separator}mode=${mode}`;
      }
    }
  
    console.log('url', url);
    const response = await axios.get(url);
    return response.data;
  },

  async GetCategories(
    userExId?: string | null
  ): Promise<GetCategoriesResponse> {
    let apiUrl = `${process.env.REACT_APP_API}/api/categoriesApp`

    if (userExId) {
      apiUrl += `?userExId=${userExId}`
    }

    const response = await axios.get(apiUrl)
    return response.data
  },

  async GetCategoriesFilter(
    userExId: string,
    searchValue: string
  ): Promise<GetCategoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/categoriesApp?userExtId=${userExId}&search=${searchValue}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    return response.data
  },

  async GetDynamicCategories(
    lvl1: string,
    lvl2: string,
    lvl3: string
  ): Promise<GetCategoriesResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/categoriesAppDynamic/${lvl1}/${lvl2}/${lvl3}`
    )
    return response.data
  },

  async GetPurchaseHistory(
    userExId: string,
    sku: string
  ): Promise<GetPurchaseHistoryItem> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/purchaseHistory/${userExId}/${sku}`
    )
    return response.data
  },

  async GetProductPopUpData(sku: string): Promise<GetProductPopUpData> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/productPopUp?sku=${sku}`
    )
    return response.data
  },
}
