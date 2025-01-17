define('manual-scheduled-job:manual-job-handler', ['action-handler'], (Dep) => {

  return class extends Dep {

    initManualScheduledJob() {}

    runManually() {
      Espo.Ui.warning('Running...');
      const data = {
        id: this.view.model.id,
        name: this.view.model.attributes.name
      };
    
      Espo.Ajax.postRequest('ManualScheduledJob/action/RunManually', data)
        .then(returnData => {
          const message = this.view.translate('willRunNextRound', 'messages', 'ScheduledJob');
          Espo.Ui.success(message);
        })
        .catch(() => {
          const message = this.view.translate('cannotRunJob', 'messages', 'ScheduledJob');
          Espo.Ui.error(message);
        });
    }

      isManualScheduledJobVisible() {
        return this.view.model.get('status') !== 'Inactive';
    }
  }
});