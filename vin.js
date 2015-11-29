
// tutorial13.js
var VinBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="VinBox">
        <h1>Alkohol</h1>
        <VinList data={this.state.data} />
        <VinForm />
      </div>
    );
  }
});


var VinList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Vin vin={comment} key={comment.Varenummer}>
        </Vin>
      );
    });
    return (
      <div className="VinList">
        {commentNodes}
      </div>
    );
  }
});

var Vin = React.createClass({


  render: function() {
  	var vin = this.props.vin;
    return (
      <article className="vin">
        <h3 className="title">
          {vin.Varenavn}
        <small> {vin.Varetype}</small>
        </h3>

      	{vin.Alkohol}
      </article>
    );
  }
});

var VinForm = React.createClass({
  render: function() {
    return (
      <div className="VinForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var jSmall= 'produkt-eksempel.json';

ReactDOM.render(
  <VinBox url='produkter.json'  />,
  document.getElementById('content')
);