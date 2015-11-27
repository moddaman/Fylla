$(document).ready(function() {
    $.getJSON("produkter.json", function(data) {
        console.log(data.length);
        var items = [];
        $.each(data, function(key, val) {
            items.push("<li id='" + key + "'>" + val.Varenavn + "</li>");
        });

        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");
    });
});
