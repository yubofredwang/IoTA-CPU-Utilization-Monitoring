//
//  Updates the leaderboard list HTML
//
function updateBoardHTML(rankedList) {

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

        var timestamp = rankedList[i].timestamp;
        var cpupercentage = rankedList[i].cpupercentage;
        var listElement = '<tr><td class="iota__timestamp">' + timestamp + '</td><td class="iota__cpupercentage">' + cpupercentage;
        html += listElement;
    }

    $("#leaderboard").html(html);
}
