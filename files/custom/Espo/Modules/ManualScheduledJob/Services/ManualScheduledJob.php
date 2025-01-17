<?php

namespace Espo\Modules\ManualScheduledJob\Services;

use Espo\ORM\Entity;
use Espo\Services\Record;

/**
 * Service for manually running a Scheduled Job
 */
class ManualScheduledJob extends Record
{    
    /**
     * Runs the specified job manually.
     *
     * @param object $data The data for the request. Must include 'name' and 'id'
     * 
     * @return bool True on success, false on failure
     */
    public function runJobManually(object $data): bool {
        $nextDate = date('Y-m-d H:i:s');
        $jobEntity = $this->entityManager->getEntity('Job');
        
        $jobEntity->set([
            'name' => $data->name,
            'status' => 'Pending',
            'scheduledJobId' => $data->id,
            'executeTime' => $nextDate,
        ]);
        
        // Handle potential exceptions when saving the entity
        try {
            return $this->entityManager->saveEntity($jobEntity)? true : false;
        } catch (\Exception $e) {
            // Log the error and re-throw it
            $GLOBALS['log']->error('Error while running ManualScheduledJob: ' . $e->getMessage());
            throw $e;
        }
    }
}