<?php

namespace App\Cron\Core;

use App\Entity\Product;
use App\Erp\Core\ErpManager;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;

class GetProducts
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly ProductRepository $productRepository,
        private readonly ErpManager $erpManager,
    )
    {
    }

    public function sync()
    {
        $skip = 0;
        $pageSize = 30;
        do {
            $res = $this->erpManager->GetProducts($pageSize, $skip);
            if (!empty($res->products)) {
                foreach ($res->products as $key => $itemRec) {
                    if($itemRec->sku && $itemRec->categoryLvl1Id && $itemRec->categoryLvl2Id){
                        try {
                            $product = $this->productRepository->findOneBySku($itemRec->sku);
                            if (!$product) {
                                $product = new Product();
                                $product->setSku($itemRec->sku);
                                $product->setCreatedAt(new \DateTimeImmutable());
                            }
                            $findCategorylvl1 = $this->categoryRepository->findOneByExtIdAndLvlNumber($itemRec->categoryLvl1Id,1);
                            if(!empty($findCategorylvl1)){
                                $product->setCategoryLvl1($findCategorylvl1);
                                $findCategorylvl2 = $this->categoryRepository->findOneByExtIdAndParentId($itemRec->categoryLvl2Id,$findCategorylvl1->getId());
                                if(!empty($findCategorylvl2)){
                                    $product->setCategoryLvl2($findCategorylvl2);
                                }
                            }

                            $product->setOrden($key);
                            $product->setTitle($itemRec->title);
                            $product->setPackQuantity($itemRec->packQuantity);
                            $product->setBasePrice($itemRec->baseprice);
                            $product->setUpdatedAt(new \DateTimeImmutable());
                            $product->setIsPublished($itemRec->status);
                            $product->setIsNew(false);
                            $product->setIsSpecial(false);
                            $this->productRepository->createProduct($product, true);
                        } catch (\Exception $e) {
                            dd($itemRec);
                        }
                    }
                }
                $skip += $pageSize;
            } else {
                break;
            }
        } while (true);
    }

}