var WhichKid = React.createClass({
  getInitialState: function() {
    return { kidList: [], currentKid: '' };
  },
  
  addKid: function(event) {
    console.log(this.refs.newKid.value);
    var list = this.state.kidList;
    list.push(this.refs.newKid.getDOMNode().value);
    this.refs.newKid.getDOMNode().value = '';
    this.setState({kidList: list});
  },
  
  pickOne: function() {
    var i;
    if (!this.state.kidList) {
        return;
    }
    i = new Date().getTime() % this.state.kidList.length;
    this.setState({currentKid: this.state.kidList[i]});
    console.log('picked ' + this.state.currentKid);
  },
  
  renderCurrentKid: function() {
      if (this.state.currentKid) {
            return (
                <div>Right now you love <strong>{this.state.currentKid}</strong> more.</div>
            );
        }
  },

  deleteKid: function(i) {
    var list = this.state.kidList;
    list.splice(i, 1);
    this.setState({kidList: list});
  },
  
  renderKidList: function() {
    var list = [];
    
    if (!this.state.kidList || this.state.kidList.length == 0) {
        return (
            <div>No kids defined yet</div>
        );
    }
    
    this.state.kidList.forEach(function(kid, i) {
        list.push(<li>{kid}  <a href="#" onClick={this.deleteKid.bind(null, i)}>Delete</a> </li>)
    }.bind(this));
    
    return (
        <ul>{list}</ul>
    );
  },
  
  render: function() {
  
    var pickOneLink = '';
    
    if (this.state.kidList && this.state.kidList.length > 0) {
        pickOneLink = (<a href="#" onClick={this.pickOne}>Pick one</a>)
    }
    
    return (
      <div>
        {this.renderKidList()}
        <input ref="newKid" size="10" placeholder="enter kid name" defaultValue=''></input>
        <button onClick={this.addKid}>Add Kid</button>
        <br/>
        {pickOneLink}
        {this.renderCurrentKid()}
      </div>
    );
  }
});

React.render(
  <WhichKid />,
  document.getElementById('container')
);
