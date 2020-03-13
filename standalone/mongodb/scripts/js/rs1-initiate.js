rs.initiate({
    _id : "rs1", 
    members: [
        { _id : 0, host : "10.0.0.15:27018" },
        { _id : 1, host : "10.0.0.16:27018" },
        { _id : 2, host : "10.0.0.17:27018", arbiterOnly: true }
    ]
});