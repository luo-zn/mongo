rs.initiate({
    _id : "rs0", 
    members: [
        { _id : 0, host : "rs0_node1:27018" },
        { _id : 1, host : "rs0_node2:27018" },
        { _id : 2, host : "rs0_node3:27018", arbiterOnly: true }
    ]
});