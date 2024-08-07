<?php

namespace App\Controller;

use App\Erp\Core\ErpManager;
use App\helpers\ApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController
{
    public function __construct(
        private readonly ErpManager $erpManager,
    )
    {
    }

    #[Route('/cartCheck', name: 'app_cart', methods: ['POST'])]
    public function index(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $this->checkStock($data);
            $this->checkPrice($data);
            $response = $this->erpManager->GetUserDeliveryInfo($data['user']['extId']);

            $deliveris = $this->GetTwoWeeksAhead($response);
            $obj = new \stdClass();
            $obj->maam = 17.0;
            $obj->delivery = $deliveris;

            return  $this->json((new ApiResponse($obj,''))->OnSuccess());
        } catch (\Exception $e) {
            return $this->json((new ApiResponse(null,$e->getMessage()))->OnError());
        }
    }

    private function GetTwoWeeksAhead($deliveryData)
    {
        $hebrewDays = [
            1 => 'יום שני',
            2 => 'יום שלישי',
            3 => 'יום רביעי',
            4 => 'יום חמישי',
            5 => 'יום שישי',
            6 => 'שבת',
            7 => 'יום ראשון'
        ];

        $currentDate = new \DateTime();
        $endDate = clone $currentDate;
        $endDate->modify('+2 weeks');
        $newDelivery = [];
        $currentDate->modify('+1 day');
        while ($currentDate <= $endDate) {
            $dayOfWeek = $currentDate->format('N');
            foreach ($deliveryData as $delivery) {
                if ($delivery->day == $dayOfWeek) {
                    $isCanSend = true;
                    $tomorrow = (clone $currentDate)->modify('+1 day');
                    if ($tomorrow->format('N') == $delivery->day && new \DateTime() > new \DateTime('14:00')) {
                        $isCanSend = false;
                    }
                    $newDelivery[] = [
                        'date' => $currentDate->format('Y-m-d'),
                        'hebrewDay' => $hebrewDays[$dayOfWeek],
                        'day' => $delivery->day,
                        'fromTime' => $delivery->fromTime,
                        'toTime' => $delivery->toTime,
                        'isCanSend' => $isCanSend
                    ];
                    break;
                }
            }
            $currentDate->modify('+1 day');
        }
        return $newDelivery;
    }

    private function checkStock($data)
    {

    }

    private function checkPrice($data)
    {

    }


}
