var characters = [];

$("#submit").on('click', function () {
    var charInput = $('#character-input').val().trim();
    charInput= charInput.toLowerCase()
    charInput = charInput.replace(/\b\w/g, l => l.toUpperCase())
    charInput = charInput.replace(' ', '-');
    characters.push(charInput);
    //if statement saying if it is in marvel character database than run this function below } else alert saying it is not a character
    var name = $(this).attr('data-name');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + charInput + "+marvel+movie&api_key=N58pplWVQxSxzn6cv54929BIxQdzCdgJ&limit=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            var myFunc = function () {
                var button = $('<button>');
                button.addClass("remove");
                var gifImage = $('<img>');
                gifImage.addClass("gif");
                gifImage.addClass(charInput);
                gifImage.attr('data-toggle', 'modal');
                gifImage.attr('data-target', '#gifBox');
                var x = Math.floor(Math.random() * 2);
                gifImage.attr('src', results[x].images.fixed_height.url);
                button.append(gifImage);
                $('#gif').append(button);
            }
            myFunc();

            // Marvel
            var publicKey = "edee4541fdd441305827517a3be008fa";
            var privateKey = "b3eb203ce301f638823f6def8be7308a8a2c3a87";
            var url = "https://gateway.marvel.com/v1/public/characters?name=" + charInput;

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
            }).then(function (marvelResults) {
                console.log(marvelResults);
                var marvelName = marvelResults.data.results[0].name;
                var marvelBio = marvelResults.data.results[0].description;
                var marvelImage = marvelResults.data.results[0].thumbnail.path + '.jpg';
                console.log(marvelName);
                console.log(marvelBio);
                $('.' + marvelName + '').attr('data-name', marvelName);
                $('.' + marvelName + '').attr('data-bio', marvelBio);
                $('.' + marvelName + '').attr('data-src', marvelImage );
                var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=moderate&q=" + charInput + "+fight+scene&type=video&order=relevance&maxResults=10&key=AIzaSyDgZS_6eBxr4jH-6ct7ETxb7IzN6kJ99_Q";

                $.ajax({
                    url: youtubeURL,
                    method: "GET"
                    // After the data comes back from the API
                }).then(function (response) {
                    console.log(response);
                    var videoID = (response.items[0].id.videoId);
                    var vidEmbed = '<iframe width="515" height="310" class="col-lg-12 justify-content-center mt-2" src="https://www.youtube.com/embed/' + videoID + '"frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                    $('.' + marvelName + '').attr('data-web', vidEmbed);
                });
            });
        });
    $('#character-input').val('');
});

$('#clear').on('click', function () {
    $('.remove').remove();
});
 
$(document).on('click', '.gif', function () {
    $('iframe').remove();
    $('#marvelPic').remove();
    var newDiv = $("<div class='col-lg-12'id=marvelPic>")
    $(this).attr('href', "#gifBox");
    $('.marvelName').text($(this).attr('data-name'));
    $('#marvelBio').text($(this).attr('data-bio'));
    $('.marvelTube').append($(this).attr('data-web'));
    newDiv.append('<img id="thumbnail" class="" src="'+ $(this).attr("data-src") + '">');
    $('#textBox2Container').prepend(newDiv);
});