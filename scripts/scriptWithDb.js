var items;
var listInDom;
//var currentCategory;

var MYAPP = MYAPP || {};
MYAPP.categories = {
    categoriesList: ["Akevitt", "Portvin", "Vodka", "Druebrennevin", "Whisky", "Likør under 22 %", "Genever", "Likør", "Gin", "Bitter", "Fruktbrennevin", "Vermut", "Aromatisert Svakvin og annen blandet dri", "Øvrig Brennevin under 22 %", "Øvrig Brennevin", "Sherry", "Bitter under 22 %", "Rødvin", "Hvitvin", "Rosévin", "Musserende Vin", "Alkoholfritt", "Rom", "Øl", "Øvrig Sterkvin", "Fruktvin", "Aromatisert Sterkvin", "Musserende Fruktvin", "Madeira", "Øvrig Svakvin"],
    selectedCategoriesList: ["Rødvin", "Øl"],

    createHtmlInput: function () {
        var s = '';

        for (var i = 0; i < this.categoriesList.length; i++) {
            var category = this.categoriesList[i];
            var sChecked = this.selectedCategoriesList.indexOf(category) == -1 ? '' : 'checked="checked"';
            s += '<input type="checkbox" class="filled-in" id="' + category + '" ' + sChecked + ' />';
            s += '<label for="' + category + '">' + category + '</label>';
        }
        return s;
    },

    isSelected: function (category) {
        return this.selectedCategoriesList.indexOf(category) !== -1;
    },
    changeStatus: function (category) {
        var indexOf = this.selectedCategoriesList.indexOf(category);
        if (indexOf == -1) {
            this.selectedCategoriesList.push(category);
        } else {
            this.selectedCategoriesList.splice(indexOf, 1);
        }
    }

};


$(document).ready(function () {
    createCategoriesHtml();


    $.getJSON("data/produkterFinalId.json", function (data) {
        items = data.viner;

        items.sort(function (a, b) {
            return parseFloat(a.alkholpris) - parseFloat(b.alkholpris);
        });


        console.log('Vin size: ' + items.length);
        search('');

    });


    function add100FirstRandomShitFuck() {
        var s = '';
        var current = 0,
            max = 10;

        var list = [];
        for (var i = 0; i < max; i++) {
            list.push(items[i]);
        }
        addListMaterialToHtml(list);
    }

    function addListToHtml(list) {
        var s = '';
        var v;
        for (var i = 0; i < list.length; i++) {
            v = list[i];
            s += '<article><h4>' + v.varenavn + ' <small>' + v.varetype + '</small></h4>';
            s += 'Pris: ' + v.pris + ' ( ' + v.literpris + ' per liter) ' + v.volum + 'L<br>';
            s += 'alkohol: ' + v.alkohol + '%<br>';
            s += 'Best : ' + v.alkholpris.toFixed(2) + ' (pris per Alkohol)';
            s += '</article>';
        }
        $('#wines').empty();
        $('#wines').append(s);

    }

    function addListMaterialToHtml(list) {

        var s = '';

        var v;
        for (var i = 0; i < list.length; i++) {
            v = list[i];

            s += '<li class="collection-item avatar">';
            s += ' <i class="material-icons circle red">local_drink</i>' +
                '<div class="row"><div class="col s9">';
            s += '  <span class="title">' + v.varenavn + '</span>';

            s += '  <p>' + v.varetype + '<br>';
            s += 'Pris: ' + v.pris + ' ( ' + v.literpris + ' per liter) ' + v.volum + 'L<br>';
            s += 'Best : ' + v.alkholpris.toFixed(2) + ' (pris per Alkohol)</p>';
            s += '<i class="material-icons">location_on</i>' + v.land + ', ' + v.distrikt + ', ' + v.underdistrikt;
            s += '</div >' +
                '<div class="col s3">' + createScaleHtml(v) +
                '</div>';
            //s += '</div>';
            s += '</li>';
        }
        $('#wines').empty();
        $('#wines').append(s);


    }

    function createScaleHtml(vin) {
        return createSingleScale('Fylde', 'light-blue lighten-4', 'blue', vin.fylde) +
            createSingleScale('Friskhet', 'light-green lighten-4', 'green', vin.friskhet) +
            createSingleScale('Garvestoffer', 'red lighten-4', 'red', vin.garvestoffer);
    }

    /*
     <h6>Fylde</h6>
     <div class="progress light-blue lighten-4">
     <div class="determinate blue" style="width: 70%"></div>
     </div>
     */
    // scale is from[ 0 to 12]
    function createSingleScale(name, color1, color2, scale) {
        var newScale = (scale / 12) * 100;
        var s = '<h6>' + name + '</h6>';
        s += '  <div class="progress ' + color1 + '">';
        s += ' <div class="determinate ' + color2 + '" style="width: ' + newScale + '%"></div>';
        s += '</div>';
        return s;
    }

    /*
     <input type="checkbox" class="filled-in" id="filled-in-box" checked="checked" />
     <label for="filled-in-box">Filled in</label>
     */
    function createCategoriesHtml() {

        $('#categories').empty();
        $('#categories').html(MYAPP.categories.createHtmlInput());

        $('input:checkbox').change(function () {
            console.log(this.id + ' : ' + $(this).is(":checked"));
            MYAPP.categories.changeStatus(this.id);
            updateSearch();
        });


    }

    $('#searchForm').on('submit', function (e) {
        updateSearch();
        e.preventDefault();
    });

    $('#searchInput').on('input', function () {
        console.log("change");
        updateSearch();
    });


    //function findAllCategories() {
    //    var categories = [];
    //    items.forEach(function (vin) {
    //
    //        if (categories.indexOf(vin.Varetype) == -1) {
    //            categories.push(vin.Varetype);
    //        }
    //    });
    //    console.log(categories);
    //}

    function updateSearch() {
        search($("#searchInput").val());
    }

    function search(query) {

        $('#wines').empty();
        console.log("searching for " + query);

        console.log(MYAPP.categories.selectedCategoriesList);

        var list = [];
        for (var i = 0; i < items.length; i++) {

            if (!MYAPP.categories.isSelected(items[i].varetype)) {
                continue;
            }

            if (items[i].varenavn.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                list.push(items[i]);
            }
            if (list.length > 100) {
                break;
            }
        }
        addListMaterialToHtml(list);
        console.log("results: " + list.length);

    }


});
