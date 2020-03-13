db.getSiblingDB("ocsp").auth("ocspAdmin", "ocsp123");
sh.enableSharding("ocsp");
db = db.getSiblingDB("ocsp");

db.newcontactx.createIndex({ "owner" : "hashed" });
sh.shardCollection( "ocsp.newcontactx", {"owner": "hashed" } );

db.contacts.createIndex({ "_id" : "hashed" });
sh.shardCollection( "ocsp.contacts", {"_id": "hashed" } );

db.activity.createIndex({ "uid" : "hashed" });
sh.shardCollection( "ocsp.activity", {"uid": "hashed" } );

db.fences.createIndex({ "did" : "hashed" });
sh.shardCollection( "ocsp.fences", {"did": "hashed" } );

db.dailyrecord.createIndex({ "devId" : "hashed" });
sh.shardCollection( "ocsp.dailyrecord", {"devId": "hashed" } );

db.devices.createIndex({"_id" :"hashed"});
sh.shardCollection( "ocsp.devices", {"_id" :"hashed"} );

db.newgroupx.createIndex({"owner": "hashed"});
sh.shardCollection( "ocsp.newgroupx", {"owner": "hashed"} );

db.groups.createIndex({"_id":"hashed"} );
sh.shardCollection( "ocsp.groups", {"_id":"hashed"} );

db.newlbs.createIndex({"imei":"hashed"});
sh.shardCollection( "ocsp.newlbs", {"imei":"hashed"} );

db.steps.createIndex({"uid":"hashed"});
sh.shardCollection( "ocsp.steps", {"uid":"hashed"} );

db.newim.createIndex({"owner":"hashed"});
sh.shardCollection( "ocsp.newim", {"owner":"hashed"} );

db.family.createIndex({"_id" : "hashed" });
sh.shardCollection( "ocsp.family", {"_id":"hashed"} );

db.scores.createIndex({"_id":"hashed"});
sh.shardCollection( "ocsp.scores", {"_id":"hashed"} );

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
sh.shardCollection("ocsp.exercises", {"uid": "hashed"});

db.hotspot.createIndex({"_id":"hashed"});
sh.shardCollection( "ocsp.hotspot", {"_id":"hashed"} );

db.printShardingStatus();

// db.messages.createIndex({"pid" : 1,"deviceid" : 1,"reserve" : 1 });
// sh.shardCollection( "ocsp.messages", {"pid":1,"deviceid":1});
// db.files.createIndex({"pid": "hashed"});
// sh.shardCollection( "ocsp.files", {"pid": "hashed"} );
