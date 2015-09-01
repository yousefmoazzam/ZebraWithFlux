/**
 * Created by twi18192 on 01/09/15.
 */

var AppDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _stuff = {
  tabState: ["first"
  ],

  dropdownListVisible: false
};

var addTab = function(){
  /* set state of tabs somewhere here*/
  var newTabs = _stuff.tabState.concat(
    ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4));
  _stuff.tabState = newTabs;
  /* could you just skip the variable newTabs and set _stuff.tabState equal
  itself concatenated?
   */
};

var removeTab = function(item){
  /* code for removing tabs*/

  var newTabs = _stuff.tabState;  /*setting up the current state of tabs, and then getting rid of the currently selected tab*/
  newTabs.splice(item, 1);
  _stuff.tabState = newTabs;
};

var dropdownMenuShow = function(){
  _stuff.dropdownListVisible = true
};

var sidePaneStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb)
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb)
  },
  getTabState: function(){
    return _stuff.tabState;
  },
  getDropdownState: function(){
    return _stuff.dropdownListVisible;
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  var item = action.item;
  switch(action.actionType){
    case appConstants.ADD_TAB:
      console.log(payload);
      console.log(action);
          addTab();
          sidePaneStore.emitChange();
      console.log(_stuff.tabState);
          break;

    case appConstants.REMOVE_TAB:
      console.log(payload);
      console.log(action);
      console.log(item);
          removeTab(item);
          sidePaneStore.emitChange();
      console.log(_stuff.tabState);
          break;

    case appConstants.DROPDOWN_SHOW:
      console.log(payload);
      console.log(action);
          dropdownMenuShow();
          sidePaneStore.emitChange();
      console.log(_stuff.dropdownListVisible);
          break;

    default:
          return true;
  }
});

module.exports = sidePaneStore;
