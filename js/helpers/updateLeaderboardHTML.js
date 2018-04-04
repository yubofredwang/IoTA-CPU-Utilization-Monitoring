//
//  Updates the leaderboard list HTML
//
function updateLeaderboardHTML(rankedList) {

    // Now we actually sort the rankedList
    rankedList.sort(function (a, b) {
        if (a.value > b.value) {
            return -1;
        }
        if (a.value < b.value) {
            return 1;
        }
        // a must be equal to b
        return 0;
    });

    var html = '';

    for (var i = 0; i < rankedList.length; i++) {

        var timpstamp = rankedList[i].timpstamp;
        var temperature = rankedList[i].temperature;
        var listElement = '<tr><td class="iota__timestamp">#' + timpstamp + '</td><td class="iota__temperature">' + temperature;
        html += listElement;
    }

    $("#leaderboard").html(html);
}
