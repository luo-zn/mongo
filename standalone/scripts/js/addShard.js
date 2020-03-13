db.getSiblingDB("admin").auth("superAdmin", "abc123456654321");
sh.addShard("rs0/rs0_node1:27018,rs0_node2:27018,rs0_node3:27018");
sh.addShard("rs1/rs1_node1:27018,rs1_node2:27018,rs1_node3:27018");