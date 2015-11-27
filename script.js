$(document).ready(function() {
    $.getJSON("produkter.json", function(data) {
       
        var items = [data.length];
        var s = '';
        var current = 0,
            max = 100;

         for (var i = 0; i < data.length; i++) {
            items[i]= data[i];
        }
         console.log('Vin size: ' + items.length);
        for (var i = 0; i < max; i++) {
            var v = data[i];
            s = '<article><h4>' + v.Varenavn + '</h4>';
            s += 'Pris: ' + v.Pris + ' ( '+v.Literpris+' per liter) <br>';
            s += 'Alkohol: '  + v.Alkohol;
            s += '</article>';
            addToHtml(s);

        }

    });

    function addToHtml(s) {
        $('#wines').append(s)
    }


    function search(query){

    	for (var i = 0; i < items.length; i++) {
            if(items[i].Varenavn.indexOf(query)){
            	console.log("match :"+items[i]);
            	
            }
        }

    }


});
