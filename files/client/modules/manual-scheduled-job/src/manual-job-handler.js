define('manual-scheduled-job:manual-job-handler', ['action-handler'], function (Dep) {

  return Dep.extend({

    actionRunManually: function () {
      Espo.Ui.warning('Running...');
      var data = {
        id: this.view.model.id,
        name: this.view.model.attributes.name
      };

      this.ajaxPostRequest('ManualScheduledJob/action/RunManually', data).then(returnData => {
        let message = this.view.translate('willRunNextRound', 'messages', 'ScheduledJob');
        Espo.Ui.success(message);
      }).fail(() => {
        let message = this.view.translate('cannotRunJob', 'messages', 'ScheduledJob');
        Espo.Ui.error(message);
      });
    },

    initManualScheduledJob: function () {
      this.controlButtonVisibility();

      this.view.listenTo(
        this.view.model,
        'change:status',
        this.controlButtonVisibility.bind(this)
      );
    },

    controlButtonVisibility: function () {
      if (this.view.model.get('status') != 'Inactive') {
        this.view.showHeaderActionItem('RunManually');
      } else {
        this.view.hideHeaderActionItem('RunManually');
      }
    },
  });
});