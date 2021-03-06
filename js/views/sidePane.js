/**
 * Created by twi18192 on 01/09/15.
 */

var React = require('react');
var ReactPanels = require('react-panels');
var sidePaneStore = require('../stores/sidePaneStore');
var sidePaneActions = require('../actions/sidePaneActions');
var Dropdown = require('./dropdownMenu');

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
var Button = ReactPanels.Button;

function getSidePaneState(){
  return{
    tabState: sidePaneStore.getTabState(),
    selectedTabIndex: sidePaneStore.getSelectedTabIndex()
  }
}

var SidePane = React.createClass({

  getInitialState: function(){
    return{
      tabState: sidePaneStore.getTabState(),
      selectedTabIndex: sidePaneStore.getSelectedTabIndex()
    }
  },

  _onChange: function(){
    this.setState(getSidePaneState());
    //this.refs.panel.setSelectedIndex(this.state.selectedTabIndex, null);
    /* this works, but I'm not convinced that this is the 'Flux' way to do things...
    UPDATE: actually it doesn't work, selected tab content jumps about!*/
  },

  handleActionAddTab: function(){
    sidePaneActions.addTab("this is the item"); /* this is what the plus button should invoke when clicked */
  },

  handleActionRemoveTab: function(){
    var selectedIndex = this.refs.panel.getSelectedIndex();
    sidePaneActions.removeTab(selectedIndex);
  },

  handleActionTabChangeViaOtherMeans: function(tab){
    console.log(tab);
    sidePaneActions.dropdownMenuSelect(tab, this);
    console.log("action function for changing tab via other means ran correctly");
  },

  handleActionPassingSidePaneOnMount: function(){
    console.log(this);
    sidePaneActions.passingSidePane(this)
  },

  componentDidMount: function(){
    sidePaneStore.addChangeListener(this._onChange);
    this.handleActionPassingSidePaneOnMount()
  },

  componentWillUnmount: function(){
    sidePaneStore.removeChangeListener(this._onChange)
  },
  //
  //dropdownChange:function(tab) {
  //  this.refs.panel.setSelectedIndex(tab, null);
  //  console.log(tab)
  //  console.log("it ran correctly");
  //},

  render: function () {
    var skin = this.props.skin || "default",
      globals = this.props.globals || {};
    var tabs = this.state.tabState.map(function(item, i) {
      var tabTitle = "Tab " + item.name;
      var tabIndex = i + 1;
      var tabContent = function(){
        var content = [];
        for (var key in item.info){                      /*can't use .map since item.info is an object, not an array*/
          content.push(<p>{key}: {item.info[key]}</p>)
        }
        return {content}
      };
      return (
        <Tab key={item.name} title={tabTitle}>

          <Content>Content of {tabTitle} <br/> Tab number {tabIndex}
            {tabContent()}
          </Content>

        </Tab>
      );
    }.bind(this));
    return (
      <Panel ref="panel" theme="flexbox" skin={skin} useAvailableHeight={true} globals={globals} buttons={[

          //<Button title="Add another tab" onButtonClick={this.handleActionAddTab}>
          //  <i className="fa fa-plus"></i>
          //</Button>,
          <Button title="Remove active tab" onButtonClick={this.handleActionRemoveTab}>
            <i className="fa fa-times"></i>
          </Button>,
          <Button title="Drop down menu">
          <div id="dropDown"><Dropdown changeTab={this.handleActionTabChangeViaOtherMeans} /></div>
          </Button>
        ]}>
        {tabs}
      </Panel>
    );
  }
});

module.exports = SidePane;
