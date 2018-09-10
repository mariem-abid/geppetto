module.exports = {
  LogsPage: {
    Logs:{
      checkbox:'#logs_grid_table tr:nth-child(%D) div.md-checkbox',
      settings:'#logs-grid-actions-button',
      erase_button:'#logs_grid_action_delete_all_email_logs',
      no_records_found:'#logs_grid_table > tbody > tr:nth-child(1) p:nth-child(2)'
    },
    LogsByEmail:{
      logs_by_email_label:'#main-div label.form-control-label',
      logs_by_email_input:'#form_logs_by_email_logs_by_email'
    }
  }
};
