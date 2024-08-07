interface ICart {
  discount: number
  price: float
  product: IProduct
  quantity: number
  sku: string
  stock: number
  total: float
  choosedPackQuantity: number
}

type IDocumentType = 'order' | 'quote' | 'return' | 'draft'

interface IDocumentMode {
  value: IDocumentType
  label: string
  isOnlyAgent: boolean
}

type IPriceMode = 'selfPrice' | 'updatedPrice'

interface ICartCheck {
  maam: float
  delivery: IDelivery[]
}

interface IDelivery {
  date: string
  hebrewDay: string
  day:string
  fromtTime:string
  toTime:string
  isCanSend: boolean
}

interface CartCheckResponse extends ApiResponse {
  data: ICartCheck
}

interface SendOrderResponse extends ApiResponse {
  data: {
    historyId: number
    orderNumber: string | null
  }
}
