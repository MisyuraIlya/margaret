<?php

namespace App\Cron\Core;

use App\Entity\User;
use App\Enum\UsersTypes;
use App\Erp\Core\ErpManager;
use App\Repository\UserRepository;

class GetAgents
{
    public function __construct(
        private readonly UserRepository $repository,
        private readonly ErpManager $erpManager,
    )
    {}

    public function sync()
    {
        $response = $this->erpManager->GetAgents();
        foreach ($response->users as $itemRec) {
            $user = $this->repository->findOneByExIdAndPhone($itemRec->userExId, $itemRec->phone);
            if($itemRec->userExId) {
                if(empty($user)){
                    $user = new User();
                    $user->setExtId($itemRec->userExId);
                    $user->setPhone($itemRec->phone);
                    $user->setCreatedAt(new \DateTimeImmutable());
                    $user->setIsRegistered(false);
                }
                $user->setIsAgent(true);
                $user->setRoles(UsersTypes::AGENT);
                $user->setRole(UsersTypes::AGENT);
                $user->setIsBlocked(false);
                $user->setUpdatedAt(new \DateTimeImmutable());
                $user->setName($itemRec->name);
                $user->setIsAllowOrder(true);
                $user->setIsAllowAllClients(false);
                $user->setSearch($itemRec->userExId . ' ' . $itemRec->name);
                $this->repository->createUser($user, true);
            }
        }
    }
}