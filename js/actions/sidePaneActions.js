/**
 * Created by twi18192 on 01/09/15.
 */

var AppDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');

var sidePaneActions = {
  addTab: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TAB,
      item: item
    })
  },
  removeTab: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_TAB,
      item: item
    })
  },
  dropdownMenuShow: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.DROPDOWN_SHOW,
      item: item
    })
  }

};

module.exports = sidePaneActions;
