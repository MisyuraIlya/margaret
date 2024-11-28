interface IQuantityKeeper {
    sumPreviousMonthCurrentYear: number;
    sumPreviousMonthPreviousYear: number;
    averageLastThreeMonths: number;
  }
  
type IQuantityKeeperSummary = Record<string, IQuantityKeeper>;

interface ISalesKeeper {
    sumPreviousMonthCurrentYear: number
    sumPreviousMonthPreviousYear: number
    averageLastThreeMonths: number
}