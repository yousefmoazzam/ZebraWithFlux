/**
 * Created by twi18192 on 25/08/15.
 */

var AppDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _stuff = {
    footerState: false,
    configPanelOpen: false
};

var toggleFooter = function(){
    _stuff.footerState = !_stuff.footerState
  };

var toggleConfigPanel = function(){
  _stuff.configPanelOpen = !_stuff.configPanelOpen
};


var mainPaneStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getFooterState: function(){
    return _stuff.footerState;
  },
  getConfigPanelState: function(){
    return _stuff.configPanelOpen;
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.FOOTER_TOGGLE:
      console.log(payload);
      console.log(action);
          toggleFooter();
          mainPaneStore.emitChange();
      console.log(_stuff.footerState);
          break;

    case appConstants.CONFIG_TOGGLE:
       console.log(payload);
       console.log(action);
          toggleConfigPanel();
          mainPaneStore.emitChange();
      console.log(_stuff.configPanelOpen);
          break;
    default:
          return true;
  }
});

module.exports = mainPaneStore;
