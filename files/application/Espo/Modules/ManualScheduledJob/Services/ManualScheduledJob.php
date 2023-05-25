<?php

namespace Espo\Modules\ManualScheduledJob\Services;

use Espo\ORM\Entity;

use Espo\Services\ScheduledJob;

class ManualScheduledJob extends ScheduledJob
{    
    public function runJobOnce($data){
        $nextDate = date('Y-m-d H:i:s');
        $jobEntity = $this->getEntityManager()->getEntity('Job');
        $jobEntity->set([
            //'name' => $data->name,
            'runOnce' => true,
            'name' => ' Control Knowledge Base Article Status',
            'status' => 'Pending',
            'scheduledJobId' => $data->id,
            'executeTime' => $nextDate,
        ]);
        $this->getEntityManager()->saveEntity($jobEntity);
        return $this->getEntityManager()->saveEntity($jobEntity)? true: false;
    }
}
