db.getSiblingDB("admin").createUser({
    user: "admin",
    pwd: "abc123",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" }
        ,{role:"clusterAdmin",db:"admin"}
        ,{role:"userAdmin",db:"admin"}
        ,"readWriteAnyDatabase"
    ]
});
db.getSiblingDB("admin").auth("admin", "abc123");
db.getSiblingDB("ocsp").createUser({
    user: "ocspAdmin",
    pwd: "ocsp123",
    roles:[
        {role:"clusterAdmin",db:"admin"}
        ,{role:"dbOwner",db:"ocsp"}
        ]
});