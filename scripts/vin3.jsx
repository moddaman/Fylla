var ProductRow = React.createClass({
    render: function () {
        var vin = this.props.product;
        return (
            <li className="collection-item avatar">
                <i className={this.customIcon()}>local_drink</i>
                <span className="alkhol-category">{vin.varetype}</span>
                <div className="row">
                    <div className="col s9">
                        <span className="title">  {vin.varenavn}</span>

                        <ul>
                            <li>Pris: {vin.pris} kr ({vin.literpris} kr/l)</li>
                            <li>Varetype: {vin.varetype}</li>
                            <li>Best: {vin.alkholpris.toFixed(2)} pris per alkohol</li>
                            <li> {vin.land}, {vin.distrikt}, {vin.underdistrikt}</li>
                        </ul>

                    </div>
                    <div className="col s3">
                        <h6>Fylde</h6>
                        <ScaleBar color1="light-blue lighten-4" color2="blue" num={vin.fylde}/>
                        <h6>Friskhet</h6>
                        <ScaleBar color1="light-green lighten-4" color2="green" num={vin.friskhet}/>
                        <h6>Garvestoffer</h6>
                        <ScaleBar color1="red lighten-4" color2="red" num={vin.garvestoffer}/>
                    </div>


                </div>
            </li>
        );
    },

    customIcon: function () {
        var color;
        switch (this.props.product.varetype) {
            case 'Øl':
                color = 'brown';
                break;
            case 'Rødvin':
                color = 'red';
                break;
            case 'Hvitvin':
                color = 'blue lighten-5';
                break;
            case 'Rosévin':
                color = 'red lighten-4';
                break;


            default:
                color = 'black';

        }
        return "material-icons circle " + color;
    }
});
var ScaleBar = React.createClass({
    render: function () {
        var progresStyle = {
            width: (this.props.num / 12) * 100 + '%'
        };
        return (
            <div className={this.dynamicClass()}>
                <div className={this.dynamicClass2()} style={progresStyle}></div>
            </div>
        );
    },
    dynamicClass: function () {
        return "progress " + this.props.color1;
    }
    ,
    dynamicClass2: function () {
        return "determinate " + this.props.color2;
    }
});


var ProductTable = React.createClass({
    render: function () {
        var rows = [];
        var maxElements = 50;
        var currElements = 0;

        var selectedCategories = this.props.selectedCategories;

        console.log('Loop :', selectedCategories);

        var countMatches=0,countTotal=0;
        this.props.products.forEach(function (product) {
            countTotal++;

            if (selectedCategories.indexOf(product.varetype) <= -1) {

               return;
            }


            if (product.varenavn.indexOf(this.props.filterText) === -1) {
                return;
            }
            countMatches++;

            if (currElements > maxElements)
                return;//HACK for speeed
            currElements++;
            rows.push(<ProductRow product={product} key={product.id}/>);

        }.bind(this));
        return (
            <ul className="collection">
                <li className="collection-item">Antall resultater : {countMatches} av {countTotal} (only showing {rows.length}) </li>
                {rows}
            </ul>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function () {

        this.props.onUserInput(
            this.refs.filterTextInput.value
        );
    },
    clickedCheckBox: function(id){
        console.log('click high layer',id);

        this.props.handleUserInputCheckbox(
            this.__getOrRemoveCheck(id)
        );
    },

    __getOrRemoveCheck: function (id) {
        var currentList = this.props.selectedCategories.slice();
        var indexOf = currentList.indexOf(id);
        if (indexOf <= -1) {
            currentList.push(id);

        } else {
            currentList.splice(indexOf, 1);
        }
        return currentList;

    },

    render: function () {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />

                <CategoryCheckbox selectedCategories={this.props.selectedCategories} clickedCheckBox={this.clickedCheckBox}/>
            </form>
        );
    }
});

var CategoryCheckbox = React.createClass({
    getInitialState: function () {
        return {
            categoriesList: ["Akevitt", "Portvin", "Vodka", "Druebrennevin", "Whisky", "Likør under 22 %", "Genever", "Likør", "Gin", "Bitter", "Fruktbrennevin", "Vermut", "Aromatisert Svakvin og annen blandet dri", "Øvrig Brennevin under 22 %", "Øvrig Brennevin", "Sherry", "Bitter under 22 %", "Rødvin", "Hvitvin", "Rosévin", "Musserende Vin", "Alkoholfritt", "Rom", "Øl", "Øvrig Sterkvin", "Fruktvin", "Aromatisert Sterkvin", "Musserende Fruktvin", "Madeira", "Øvrig Svakvin"]
        };
    },
    componentDidMount: function () {
        //$.ajax({
        //    url: 'data/vinKategorier.json',
        //    dataType: 'json',
        //    cache: true,
        //    success: function (data) {
        //        this.setState({categories: data});
        //    }.bind(this),
        //    error: function (xhr, status, err) {
        //        console.error(this.props.url, status, err.toString());
        //    }.bind(this)
        //});
        $(document).ready(function () {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });

    },
    render: function () {

        var ind = this.state.categoriesList.indexOf('Øl');
        console.log('IndexOf Øl: ',ind)
        var selectedCategories = this.props.selectedCategories;
        console.log('CategoryCheckBox.render () selectedCategories:'+ selectedCategories+' length='+selectedCategories.length);
        var checks = this.state.categoriesList.map(function (d) {
            var isChecked = selectedCategories.indexOf(d) !== -1;
            return (
                <div className="col s4" key={d}>
                    <input type="checkbox" id={d} className="filled-in"
                           checked={isChecked} onChange={this.__changeSelection.bind(this, d)}/>
                    <label htmlFor={d}>{d}</label>
                </div>

            );
        }.bind(this));
        return (
            <ul className="collapsible" data-collapsible="accordion">
                <li>
                    <div className="collapsible-header"><i className="material-icons">filter_drama</i>Filtre</div>
                    <div className="collapsible-body">

                        <div className="row">
                            {checks}
                        </div>

                    </div>
                </li>

            </ul>


        );
    },
    __changeSelection: function (id) {
        this.props.clickedCheckBox(id);
    },


    //__changeAllChecks: function () {
    //    var value = this.refs.globalSelector.getDOMNode().checked;
    //    var state = this.state.data.map(function (d) {
    //        return {id: d.id, selected: value};
    //    });
    //
    //    this.setState({data: state});
    //}
});


var NavBar = React.createClass({
    render: function () {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Findo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
});

var FilterableProductTable = React.createClass({

    getInitialState: function () {
        return {
            filterText: '',
            inStockOnly: false,
            data: [],
            selectedCategories: ["Øl", "Rødvin","Øl"]
        };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: true,
            success: function (data) {

                data.viner.sort(function (a, b) {
                    return parseFloat(a.alkholpris) - parseFloat(b.alkholpris);
                });

                this.setState({data: data.viner});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleUserInput: function (filterText) {
        this.setState({
            filterText: filterText
        });
    },
    handleUserInputCheckbox: function (selectedCategories) {
        this.setState({
            selectedCategories: selectedCategories
        });
    },


    render: function () {
        return (

            <div>


                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    selectedCategories={this.state.selectedCategories}
                    onUserInput={this.handleUserInput}
                    handleUserInputCheckbox={this.handleUserInputCheckbox}
                />

                <ProductTable
                    products={this.state.data}
                    filterText={this.state.filterText}
                    selectedCategories={this.state.selectedCategories}
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
    <FilterableProductTable products={PRODUCTS} url='data/produkterFinalId.json'/>,
    document.getElementById('main')
);
