define('manual-scheduled-job:manual-job-handler', ['action-handler'], function (Dep) {

  return Dep.extend({

    actionRunOnce: function () {
      Espo.Ui.warning('Running...');
      var data = {
        id: this.view.model.id,
        name: this.view.model.attributes.name
      };

      this.ajaxPostRequest('ManualScheduledJob/action/RunOnce', data).then(function (returnData) {
          let message = this.view.translate('willRunNextRound', 'messages', 'ScheduledJob');
          Espo.Ui.success(message);
    }.bind(this)).fail(function () {
        let message = this.view.translate('cannotRunJob', 'messages', 'ScheduledJob');
        Espo.Ui.error(message);
    }.bind(this));
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
        this.view.showHeaderActionItem('RunOnce');
      } else {
        this.view.hideHeaderActionItem('RunOnce');
      }
    },
  });
});