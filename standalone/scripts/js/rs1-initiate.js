rs.initiate({
    _id : "rs1", 
    members: [
        { _id : 0, host : "rs1_node1:27018", priority: 1.5 },
        { _id : 1, host : "rs1_node2:27018", priority: 1 },
        { _id : 2, host : "rs1_node3:27018", arbiterOnly: true }
    ]
});