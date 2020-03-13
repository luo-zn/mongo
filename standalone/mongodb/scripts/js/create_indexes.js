db.runCommand({
    createIndexes: "activities",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.activities"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "newcontactx",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.newcontactx"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "contacts",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.contacts"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "fences",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.fences"
	}

],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "dailyrecord",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.dailyrecord"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "devices",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.devices"
	}

],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "newgroupx",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.newgroupx"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "groups",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.groups"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "newlbs",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.newlbs"
	},
	{
		"key" : {
			"pid" : 1,
			"imei" : 1
		},
		"name" : "pid_1_imei_1",
		"ns" : "ocsp.newlbs"
	},
	{
		"key" : {
			"pid" : 1
		},
		"name" : "pid_1",
		"ns" : "ocsp.newlbs"
	},
	{
		"key" : {
			"imei" : 1
		},
		"name" : "imei_1",
		"ns" : "ocsp.newlbs"
	},
	{
		"key" : {
			"imei" : 1,
			"position.type" : 1
		},
		"name" : "imei_1_position.type_1",
		"ns" : "ocsp.newlbs"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "steps",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.steps"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "newim",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.newim"
	},
	{
		"key" : {
			"mid" : 1
		},
		"name" : "mid_1",
		"ns" : "ocsp.newim"
	},
	{
		"key" : {
			"gid" : 1
		},
		"name" : "gid_1",
		"ns" : "ocsp.newim"
	},
	{
		"key" : {
			"peer" : 1
		},
		"name" : "peer_1",
		"ns" : "ocsp.newim"
	},
	{
		"key" : {
			"type" : 1
		},
		"name" : "type_1",
		"ns" : "ocsp.newim"
	},
	{
		"key" : {
			"version" : 1
		},
		"name" : "version_1",
		"ns" : "ocsp.newim"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "family",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.family"
	}

],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "scores",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.scores"
	}
],
    writeConcern: { w: "majority"}
  });

db.runCommand({
    createIndexes: "exercises",
    indexes: [
	{
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ocsp.exercises"
	}

],
    writeConcern: { w: "majority"}
  });
