<?php

namespace App\Controller;

use App\Erp\Core\ErpManager;
use App\helpers\ApiResponse;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AgentProfileController extends AbstractController
{
    public function __construct(
        private readonly ErpManager $erpManager,
        private readonly UserRepository $userRepository
    )
    {}

    #[Route('/agentProfile/{agentId}', name: 'app_agent_profile')]
    public function index($agentId): Response
    {

        $this->agendId = $agentId;
        $user = $this->userRepository->findOneById($agentId);
        if(!$user) new BadRequestException('not found user with this id');
        $response = $this->erpManager->GetAgentStatistic($user->getExtId());
        $coundUsers = $user->getUsersAgent()->count();
        $res = [
            "totalPriceMonth" => $response->totalPriceMonth,
            "totalPriceYear" => $response->total,
            "averageBasket"  => $response->averageTotalBasket,
            "totalClients" => $coundUsers,

            "totalPriceDay" => $response->totalPriceToday,
            "totalDayCount" => $response->totalOrdersToday,
            "totalMonthCount" => $response->totalOrdersMonth,

            "totalMissions" => 0,
            "targetPrecent" => 0,
        ];

        return $this->json($res);

    }
}
