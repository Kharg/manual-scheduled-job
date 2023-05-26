<?php

namespace Espo\Modules\ManualScheduledJob\Controllers;

use Espo\Controllers\ScheduledJob;

class ManualScheduledJob extends ScheduledJob
{   
    /**
     * Runs the specified job manually.
     *
     * @param array $params The parameters for the request
     * @param mixed $data The data for the request
     * @param \Espo\Core\Api\Request $request The request object
     * 
     * @return mixed
     */
    public function actionRunManually($params, $data, $request) {
        // Run the manual job and handle any errors
        try {
            return $this->getService('ManualScheduledJob')->runJobManually($data);
        } catch (\Exception $e) {
            // Log the error and re-throw it
            $GLOBALS['log']->error('Error while running ManualScheduledJob: ' . $e->getMessage());
            throw $e;
        }
    }
}
