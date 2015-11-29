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

module.exports = Vin;