<?php

namespace App\Erp\Core\Dto;

class AgentStatisticDto
{
    public float $total;
    public int $totalOrders;
    public float $averageTotalBasket;
    public float $totalPriceToday;
    public float $totalPriceMonth;
    public float $totalOrdersToday;

    public float $totalOrdersMonth;

    public array $monthlyTotals;

}