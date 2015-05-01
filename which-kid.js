var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var _if = function _if(cond, x, y) {
    if (cond) {
        return x;
    } else {
        return y;
    }
};

var WhichKid = React.createClass({
  getInitialState: function() {
    return { kidList: ['asdf', 'zxcv'], currentKid: '' };
  },
  
  addKid: function(event) {
    console.log(this.refs.newKid.value);
    var list = this.state.kidList;
    list.push(this.refs.newKid.getDOMNode().value);
    this.refs.newKid.getDOMNode().value = '';
    this.setState({kidList: list});
  },
  
  hasKids: function() {
    return this.state.kidList && this.state.kidList.length > 0;
  },
  
  pickOne: function() {
    var i;
    if (!this.state.kidList) {
        return;
    }
    i = Math.floor(Math.random()*this.state.kidList.length);
    this.setState({currentKid: this.state.kidList[i]});
    console.log('picked ' + this.state.currentKid);
  },
  
  deleteKid: function(i) {
    var list = this.state.kidList;
    list.splice(i, 1);
    this.setState({kidList: list});
  },

  render: function() {
    return (
      <div>
        {_if(!this.hasKids(), 
            <div>No kids defined yet</div>,
            <ul>
            {this.state.kidList.map(function(kid, i) {
                    return <li>{kid}  <a href="#" onClick={this.deleteKid.bind(null, i)}>Delete</a> </li>
                }, this)
            }
            </ul>
        )}
        <input ref="newKid" size="10" placeholder="enter kid name" defaultValue=''></input>
        <button onClick={this.addKid}>Add Kid</button>
        <br/>
        {_if(this.hasKids(), 
            <a href="#" onClick={this.pickOne}>Pick one</a>
        )}
        <ReactCSSTransitionGroup transitionName="example">
        {_if(this.state.currentKid, 
            <div key="foo">
            Right now you love <ReactCSSTransitionGroup transitionName="example"><strong key={new Date().getTime()}>{this.state.currentKid}</strong></ReactCSSTransitionGroup> more.
            </div>
        )}
        </ReactCSSTransitionGroup> 
      </div>
    );
  }
});

React.render(
  <WhichKid />,
  document.getElementById('container')
);
