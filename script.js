$(document).ready(function() {
    $.getJSON("produkter.json", function(data) {
        console.log(data.length);
        var items = [];
        var s='';
        $.each(data, function(key, val) {
            items.push("<li id='" + key + "'>" + val.Varenavn + "</li>");
            s='<article><h4>'+val.Varenavn+'</h4>Pris: '+val.Pris+'</article>'

              $('#wines').append(s)
        });
    });
});
