var browseInput = $(".browseInput");
var goButton = $(".goButton");
var select = $(".dropdown");
var results = $(".results");
var xhr;
var next;
var url = "https://elegant-croissant.glitch.me/spotify";

$(document).on("click", ".goButton", function(e) {
    $("h2").remove();
    // abort any pending request, when ready to make a new request
    if (xhr) {
        xhr.abort();
    }
    xhr = $.ajax({
        url: url,
        data: {
            q: browseInput.val(),
            type: select.val()
        },
        success: function(data) {
            xhr = null; // чтоб предыдущий результат поиска удалился
            results.before("<h2>Results for " + browseInput.val() + "</h2>");

            data = data.artists || data.albums;

            console.log("data is ", data);

            var resultHtml = "";
            for (var i = 0; i < data.items.length; i++) {
                //console.log(data.items[i].images[0]);
                resultHtml +=
                    '<div class="searchResult"><a href="' +
                    data.items[i].external_urls.spotify +
                    '">';
                if (data.items[i].images.length) {
                    resultHtml +=
                        '<img src="' + data.items[i].images[0].url + '" />';
                } else {
                    resultHtml += '<img src="img/default.jpg" alt="cover" />';
                }
                resultHtml += data.items[i].name + "</a>";
                resultHtml += "</div>";
            }
            results.append(resultHtml);
            results.after(
                "<div class='button-wrapper'><button class='moreButton'>More</button></div>"
            );
            /* WTF is this at all?????
            var goButtonWasClicked = e.target.class == "moreButton";
            if (goButtonWasClicked) {
                url = url;
                data = {
                    q: browseInput.val(),
                    type: select.val()
                };
            } else {
                url = next;
            } */

            if (data.next) {
                next =
                    data.next &&
                    data.next.replace("https://api.spotify.com/v1/search", url);
                console.log("first attempt: next is ", next); // returns elegant-croissant webpage path
            }
        }
    });
});

$(document).on("click", ".moreButton", function(e) {
    console.log("moreButton works"); // works
    console.log("second attempt: next is ", next); // returns elegant-croissant webpage path

    xhr = $.ajax({
        url: next,
        success: function(data) {
            data = data.artists || data.albums;

            var resultHtml = "";
            for (var i = 0; i < data.items.length; i++) {
                //console.log(data.items[i].images[0]);
                resultHtml +=
                    '<div class="searchResult"><a href="' +
                    data.items[i].external_urls.spotify +
                    '">';
                if (data.items[i].images.length) {
                    resultHtml +=
                        '<img src="' + data.items[i].images[0].url + '" />';
                } else {
                    resultHtml += '<img src="img/default.jpg" alt="cover" />';
                }
                resultHtml += data.items[i].name + "</a>";
                resultHtml += "</div>";
            }
            results.append(resultHtml);
        }
    });
});

function checkScroll() {
    var userHasScrolledToBottom = $(window).scrollTop() + $(window).height();
    /*
    $(window).height() Returns height of browser viewport
    $(document).height(); Returns height of HTML document
    $(window).scrollTop();
    */
    if (userHasScrolledToBottom == $(document).height()) {
        // user has scrolled to the bottom
        getMore();
    } else {
        setTimeout(checkScroll, 500);
    }
}
