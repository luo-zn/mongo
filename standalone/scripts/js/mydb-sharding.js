db.getSiblingDB("mydb").auth("mydbAdmin", "mydb123");
sh.enableSharding("mydb");
db = db.getSiblingDB("mydb");

db.newcontactx.createIndex({ "owner" : "hashed" });
sh.shardCollection( "mydb.newcontactx", {"owner": "hashed" } );

db.contacts.createIndex({ "_id" : "hashed" });
sh.shardCollection( "mydb.contacts", {"_id": "hashed" } );

db.activity.createIndex({ "uid" : "hashed" });
sh.shardCollection( "mydb.activity", {"uid": "hashed" } );

db.dailyrecord.createIndex({ "devId" : "hashed" });
sh.shardCollection( "mydb.dailyrecord", {"devId": "hashed" } );

db.groups.createIndex({"_id":"hashed"} );
sh.shardCollection( "mydb.groups", {"_id":"hashed"} );

db.family.createIndex({"_id" : "hashed" });
sh.shardCollection( "mydb.family", {"_id":"hashed"} );

db.scores.createIndex({"_id":"hashed"});
sh.shardCollection( "mydb.scores", {"_id":"hashed"} );

db.runCommand({
    createIndexes: "exercises",
    indexes: [{
            "key" : {
                "uid" : 1,
                "time" : 1,
            },
            name: "uid_1_time_1",
        },
        {
           "key" : {
                "uid" : "hashed"
            },
            "name" : "uid_hashed",
        }
    ],
    writeConcern: { w: "majority"}
  });
sh.shardCollection("mydb.exercises", {"uid": "hashed"});

db.printShardingStatus();
