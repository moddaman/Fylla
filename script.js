    var items;
    $(document).ready(function() {
        $.getJSON("produkter.json", function(data) {

            items = [data.length];
            var s = '';
            var current = 0,
                max = 100;

            for (var i = 0; i < data.length; i++) {
                items[i] = data[i];
            }
            console.log('Vin size: ' + items.length);
            for (var i = 0; i < max; i++) {
                addToHtml(data[i]);

            }

        });

        function addToHtml(v) {
            var s = '<article><h4>' + v.Varenavn + '</h4>';
            s += 'Pris: ' + v.Pris + ' ( ' + v.Literpris + ' per liter) <br>';
            s += 'Alkohol: ' + v.Alkohol;
            s += '</article>';
            $('#wines').append(s)
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



        function search(query) {
        	 $('#wines').empty();
            console.log("searching for " + query);
            var countResults=0;
            for (var i = 0; i < items.length; i++) {
                if (items[i].Varenavn.toLowerCase().indexOf(query.toLowerCase())>1) {
                    console.log("match :" + items[i]);
                    addToHtml(items[i]);
                    countResults++;

                }
                if(countResults>100){
                	break;
                }
            }
            console.log("results: "+countResults);

        }


    });
