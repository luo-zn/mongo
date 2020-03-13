rs.initiate({
    _id: "cfgrs",
    configsvr: true, 
    members: [
        { _id : 0, host : "10.0.0.18:27019" },
        { _id : 1, host : "10.0.0.19:27019" },
        { _id : 2, host : "10.0.0.20:27019" }
    ]
});