/**
 * Created by twi18192 on 25/08/15.
 */

var React = require('react');

var ButtonStyle = {
  backgroundColor: 'grey',
  height: 25,
  width: 70,
  borderRadius: 8,
  borderStyle:'solid',
  borderWidth: 1,
  borderColor: 'black',
  fontFamily: 'Verdana',
//    color: 'white',
  textAlign: 'center',
  display: 'inline-block',
  cursor: 'pointer',
  MozUserSelect: 'none'

};

var ButtonTitlePadding = {
  position: 'relative',
  top: -6

};

var FavButton = React.createClass({
  getInitialState: function(){
    return {

    }
  },

  render: function(){
    var text = this.state.favourited ? "favourited" : "haven\'t favourited";

    return(
      <div>
        <div id="fav" style={ButtonStyle}  className={this.state.condition ? "fillin" :""} onClick={this.handleClick} ><span style={ButtonTitlePadding}> Fav</span></div>


      </div>
    );
  }

});

module.exports = FavButton;
