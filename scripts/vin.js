
// tutorial13.js
var VinBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url+'?_start=0&_end=10',
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

      <div id="wines" className="space-container">
        <h1>Alkohol</h1>
        <VinForm />
        <VinList data={this.state.data} />
      </div>
    );
  }
});

var Vin = React.createClass({


  render: function() {
    var vin = this.props.vin;
    return (
      <article className="">
        <h4 className="title">
          {vin.varenavn}
        <small> {vin.varetype}</small>
        </h4>

        {vin.alkohol}
      </article>
    );
  }
});


var VinList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.slice(0,100).map(function(comment) {
      return (
        <Vin vin={comment} key={comment.varenummer}>
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



var VinForm = React.createClass({
  render: function() {
    return (
        <div className="header-container">
          <form id="searchForm" className="row-container">
            <input id="searchInput" type="text" autofocus/>
              <input type="submit" className="btn-style" value="Søk"/>
          </form>
          <section className="typer upper-row-container ">
            <button className="ol">øl</button>
            <button className="vin">vin</button>
            <button className="musserende">musserende</button>
            <button className="akvavitt">akvavitt</button>
          </section>
        </div>
    );
  }
});

var jSmall= 'produkt-eksempel.json';

ReactDOM.render(
  <VinBox url='http://localhost:3000/viner'  />,
  document.getElementById('content')
);
