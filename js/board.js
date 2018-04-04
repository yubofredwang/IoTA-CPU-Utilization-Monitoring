$(document).ready(function() {

    //  Instantiate IOTA with provider 'http://localhost:14265'
    window.iota = new window.IOTA({
        'host': 'http://node02.iotatoken.nl',
        'port': 14265
    });
    
    var seed = '';
    var checkedTxs = 0;


    //
    //  Gets the addresses and transactions of an account
    //  As well as the current balance
    //  Automatically updates the HTML on the site
    //
    function getAccountInfo() {
        // Command to be sent to the IOTA Node
        // Gets the latest transfers for the specified seed
        iota.api.getAccountData(seed, function(e, accountData) {

            console.log("Account data", accountData);

            // Update address in case it's not defined yet

            var transferList = [];

            //  Go through all transfers to determine if the tx contains a message
            //  Only valid JSON data is accepted
            if (accountData.transfers.length > checkedTxs) {

                console.log("RECEIVED NEW TXS");

                accountData.transfers.forEach(function(transfer) {

                    try {

                        var message = iota.utils.extractJson(transfer);
                        console.log("Extracted JSON from Transaction: ", message);

                        message = JSON.parse(message);
                        console.log("JSON: ", message);

                        var newTx = {
                            'timestamp': message.timestamp,
                            'cpupercentage': message.cpupercent
                        }

                        if(newTx.timestamp === undefined){
                            console.log("none related messges");
                        }
                        else{
                            transferList.push(newTx);
                        }


                    } catch(e) {
                        console.log("Transaction did not contain any JSON Data");
                    }
                })

                // Increase the counter of checkedTxs
                checkedTxs = accountData.transfers.length;
            }

            // If we received messages, update the leaderboard
            if (transferList.length > 0) {

                updateBoardHTML(transferList);

            }
        })
    }


    $("#fetchData").on("click", function() {
        getAccountInfo();
        setInterval(getAccountInfo, 90000);
    });

});
