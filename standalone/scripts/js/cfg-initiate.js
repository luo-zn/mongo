rs.initiate({
    _id: "cfgrs",
    configsvr: true, 
    members: [
        { _id : 0, host : "cfg1:27019" },
        { _id : 1, host : "cfg2:27019" },
        { _id : 2, host : "cfg3:27019" }
    ]
});