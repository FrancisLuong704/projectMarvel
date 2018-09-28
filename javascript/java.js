var characters = [];

$("#submit").on('click', function () {
    var charInput = $('#character-input').val().trim();

    characters.push(charInput);
    //if statement saying if it is in marvel character database than run this function below } else alert saying it is not a character
    var name = $(this).attr('data-name');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + charInput + "+marvel+movie+comic&api_key=N58pplWVQxSxzn6cv54929BIxQdzCdgJ&limit=30";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            var myFunc = function () {
                var a = $('<a>');
                var gifImage = $('<img>');
                gifImage.addClass("gif");
                var x = Math.floor(Math.random() * 31)
                gifImage.attr('src', results[x].images.fixed_height.url);
                a.append(gifImage);
                $('#gif').append(a);
            }
            myFunc();
            $('#character-input').val('');
        });
});

$('#clear').on('click', function () {
    $('.gif').remove();
})
// click function forgif {
//     var currentChar = $(this).attr('data-name')
// }

var publicKey = "edee4541fdd441305827517a3be008fa";
var privateKey = "b3eb203ce301f638823f6def8be7308a8a2c3a87";

function callAPI(url) {
    var ts = moment().format("X");
    $.ajax({
        url: url,
        method: "GET",
        data: {
            apikey: publicKey,
            ts: ts,
            hash: CryptoJS.MD5(ts + privateKey + publicKey).toString()
        },
        headers: {
            "Accept": "*/*"
        }
    }).then(function (response) {
        console.log(response);
    });
}

callAPI("http://gateway.marvel.com/v1/public/characters");