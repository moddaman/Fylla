    var items;
    var listInDom;
    $(document).ready(function() {
        $.getJSON("produkter.json", function(data) {

            items = [data.length];

            for (var i = 0; i < data.length; i++) {
                items[i] = data[i];
            }
            console.log('Vin size: ' + items.length);
            add100FirstRandomShitFuck();


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
                s += '<article><h4>' + v.Varenavn + '</h4>';
                s += 'Pris: ' + v.Pris + ' ( ' + v.Literpris + ' per liter) <br>';
                s += 'Alkohol: ' + v.Alkohol + '%';
                s += '</article>';
            }
            $('#wines').empty();
            $('#wines').append(s);

        }

        $('#searchForm').on('submit', function(e) {
            // get the current value of the input field.
            search($("#searchInput").val());
            e.preventDefault();
        });

        $('#searchInput').on('input', function() {
            // get the current value of the input field.
            console.log("change")
            search($("#searchInput").val());

        });


        function sortList(list) {


        }


        function search(query) {
            if (query.length < 2) {
                add100FirstRandomShitFuck();
                return;
            }

            $('#wines').empty();
            console.log("searching for " + query);
        
            var list =[];
            for (var i = 0; i < items.length; i++) {
                if (items[i].Varenavn.toLowerCase().indexOf(query.toLowerCase()) > 1) {  
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
