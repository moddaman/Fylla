var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.varenavn.indexOf(this.props.filterText) === -1) {
                return;
            }
            if (product.pris !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked
        );
    },
    render: function() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({

    getInitialState: function() {
        return {
            filterText: '',
            inStockOnly: false,
            data: []
        };
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

    handleUserInput: function(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    render: function() {
        return (
            <div>
               /* <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />*/
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
});


var PRODUCTS = [{
        "Datotid": "2015-10-11T00:24:16",
        "varenummer": "1101",
        "varenavn": "Løiten Linie",
        "Volum": "0,70",
        "pris": "399,90",
        "Literpris": "571,30",
        "Varetype": "Akevitt",
        "Produktutvalg": "Basisutvalget",
        "Butikkategori": "Butikkategori 3",
        "Fylde": "0",
        "Friskhet": "0",
        "Garvestoffer": "0",
        "Bitterhet": "0",
        "Sodme": "0",
        "Farge": "Lys gyllen.",
        "Lukt": "Aroma med preg av vanilje, sitrus og karve.",
        "Smak": "Preg av vanilje, sitrus og karve, innslag av karamell og fat. God fylde.",
        "Passertil01": "",
        "Passertil02": "",
        "Passertil03": "",
        "Land": "Norge",
        "Distrikt": "Øvrige",
        "Underdistrikt": "Øvrige",
        "Argang": "",
        "Rastoff": "Poteter, krydder",
        "Metode": "16 mnd på fat",
        "Alkohol": "41,50",
        "Sukker": "4,50",
        "Syre": "Ukjent",
        "Lagringsgrad": "",
        "Produsent": "",
        "Grossist": "Arcus AS",
        "Distributor": "Vectura AS",
        "Emballasjetype": "Engangsflasker av glass",
        "Korktype": "",
        "Vareurl": "http://www.vinmonopolet.no/vareutvalg/varedetaljer/sku-1101"
    }]
    ;

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} url='http://localhost:3000/viner' />,
    document.getElementById('container')
);
