$(document).ready(function() {
    $.getJSON("produkter.json", function(data) {
        console.log('Vin size: ' + data.length);
        var items = [];
        var s = '';
        var current = 0,
            max = 100;


        for (var i = 0; i < max; i++) {
            var v = data[i];
            console.log(i);
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
});
