rs.initiate({
    _id : "rs0", 
    members: [
        { _id : 0, host : "10.0.0.12:27018" },
        { _id : 1, host : "10.0.0.13:27018" },
        { _id : 2, host : "10.0.0.14:27018", arbiterOnly: true }
    ]
});