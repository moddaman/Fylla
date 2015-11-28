    var items;
    var listInDom;
    var currentCategory;

    $(document).ready(function() {
        $.getJSON("produkter.json", function(data) {

            items = [data.length];

            for (var i = 0; i < data.length; i++) {
                items[i] = data[i];
                items[i].best = items[i].Literpris / items[i].Alkohol;
            }
            items.sort(function(a, b) {
                return parseFloat(a.best) - parseFloat(b.best);
            });


            console.log('Vin size: ' + items.length);
            add100FirstRandomShitFuck();

            findAllCategories();

            var test= 'Hansa IPA Ekstra Spesial Øl'.toLowerCase();
            var b = test.indexOf('hansa');
            console.log(b);

        });


        function add100FirstRandomShitFuck() {
            var s = '';
            var current = 0,
                max = 100;

            var list = [];
            for (var i = 0; i < max; i++) {
                list.push(items[i]);
            }
            addListToHtml(list);
        }

        function addListToHtml(list) {
            var s = '';
            var v;
            for (var i = 0; i < list.length; i++) {
                v = list[i];
                s += '<article><h4>' + v.Varenavn + ' <small>'+v.Varetype+'</small></h4>';
                s += 'Pris: ' + v.Pris + ' ( ' + v.Literpris + ' per liter) ' + v.Volum + 'L<br>';
                s += 'Alkohol: ' + v.Alkohol + '%<br>';
                s += 'Best : ' + v.best.toFixed(2) + ' (pris per Alkohol)';
                s += '</article>';
            }
            $('#wines').empty();
            $('#wines').append(s);

        }

        $('#searchForm').on('submit', function(e) {
            search($("#searchInput").val());
            e.preventDefault();
        });

        $('#searchInput').on('input', function() {
            console.log("change")
            search($("#searchInput").val());
        });

        $(".typer button").on("click", function() {
            currentCategory = $(this).text();
            console.log('Category :' + currentCategory);
        });


        function sortList(list) {


        }

        function findAllCategories() {
            var categories = [];
            items.forEach(function(vin) {

                if (categories.indexOf(vin.Varetype) == -1) {
                    categories.push(vin.Varetype);
                }

            });
            console.log(categories);
        }

        function setCategory(s) {

        }

        function search(query) {
            if (query.length < 2) {
                add100FirstRandomShitFuck();
                return;
            }

            $('#wines').empty();
            console.log("searching for " + query);

            var list = [];
            for (var i = 0; i < items.length; i++) {

                if (currentCategory && currentCategory.length != -1) {
                    if (items[i].Varetype.toLowerCase().indexOf(currentCategory) == -1) {
                        continue;
                    }
                }

                if (items[i].Varenavn.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                    list.push(items[i]);
                }
                if (list.length > 100) {
                    break;
                }
            }
            addListToHtml(list);
            console.log("results: " + list.length);

        }


    });
