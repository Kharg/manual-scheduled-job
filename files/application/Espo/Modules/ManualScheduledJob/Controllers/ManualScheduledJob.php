<?php
 
namespace Espo\Modules\ManualScheduledJob\Controllers;

use Espo\Core\Utils as Utils;

use Espo\Controllers\ScheduledJob;

class ManualScheduledJob extends ScheduledJob
{   
    public function actionRunOnce($params, $data, $request) {
        return $this->getService('ManualScheduledJob')->runJobOnce($data);
    }
}
