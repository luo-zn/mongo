db.getSiblingDB("admin").auth("admin", "abc123");
sh.addShard("rs0/10.0.0.12:27018,10.0.0.13:27018,10.0.0.14:27018");
sh.addShard("rs1/10.0.0.15:27018,10.0.0.16:27018,10.0.0.17:27018");