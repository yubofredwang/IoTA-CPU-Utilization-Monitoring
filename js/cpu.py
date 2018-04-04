import psutil
import time
import datetime
from iota import *
import json

seeds = b"CDNGABKMTFQCOLCBKJQKPYQZLWXGBLTWXUDKTPHDQCZVQWAZCQZQSOQPXGTFREMMGQXLIUTVO9ZYFOQRP"
addresss = b"MEDR9XEOSMLQJGIK9P9LSJJ9RJRZ9QUAULZHZQDHZVYYJFFYBPXMALPLVYSMZRRGEJLZLOENXIPAUYQOWXGXVBZTEC"

api = Iota(
    'http://node02.iotatoken.nl:14265',
    seed = seeds
        )

val = psutil.cpu_percent(interval=1)
ts = time.time()
st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
message = { "timestamp": st, "cpupercent": val}
json_mylist = json.dumps(message,separators=(',',':'))
loaded_r = json.loads(json_mylist)

api.send_transfer(
        depth = 14,
        transfers = [
                ProposedTransaction(
                                address =
                        Address(
                          addresss,
                        ),

                        value = 0,
                        message = TryteString.from_string(json_mylist),
                        ),

        ],
)
