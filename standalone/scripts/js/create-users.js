db.getSiblingDB("admin").createUser({
    user: "superAdmin",
    pwd: "abc123456654321",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        {role:"clusterAdmin",db:"admin"},
        {role:"userAdmin",db:"admin"},
        "readWriteAnyDatabase"
    ]
});
db.getSiblingDB("admin").auth("superAdmin", "abc123456654321");
db.getSiblingDB("mydb").createUser({
    user: "mydbAdmin",
    pwd: "mydb123",
    roles:[
        {role:"clusterAdmin",db:"admin"},
        {role:"dbOwner",db:"ocsp"}
        ]
});