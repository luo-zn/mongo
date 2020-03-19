#!/bin/bash
# Create By lzn


rs0-initiate(){
    local host=${1:-}
    local js_path=${2:-/data/scripts/js/rs0-initiate.js}
    mongo --host ${host} $js_path
}
rs1-initiate(){
    local host=${1:-}
    local js_path=${2:-/data/scripts/js/rs1-initiate.js}
    mongo --host ${host} $js_path
}

cfg-initiate(){
    local host=${1:-}
    local js_path=${2:-/data/scripts/js/cfg-initiate.js}
    mongo --host ${host} $js_path
}

create_users(){
    local host=${1:-}
    local js_path=${2:-/data/scripts/js/create-users.js}
    mongo --host ${host} $js_path
}

rs_create_users(){
    echo "Add 10.0.0.12:27018 users"
    create_users 10.0.0.12:27018
    echo "Add 10.0.0.15:27018 users"
    create_users 10.0.0.15:27018
}
mongos_create_users(){
    echo "Add mongos users"
    create_users 10.0.0.21:27017
}
add_shards(){
    echo "Add shards."
    local host=${1:-}
    local port=${2:-27017}
    local user=${4:-admin}
    local password=${5:-abc123}
    mongo --host ${host}:${port} -u ${user} -p ${password} /data/scripts/js/addShard.js
}
ocsp_sharding(){
    echo "Sharding ocsp."
    local host=${1:-}
    local port=${2:-27017}
    local user=${4:-admin}
    local password=${5:-abc123}
    mongo --host ${host}:${port} -u ${user} -p ${password} /data/scripts/js/ocsp-sharding.js
}

find_base_dir() {
    local real_path=$(python -c "import os;print(os.path.realpath('$0'))")
    local dir_name="$(dirname "$real_path")"
#    echo "$(dirname ${dir_name})"
    echo "${dir_name}"
}



ping-server(){
    local host=$1
    printf "%s" "waiting for $host ..."
    while ! ping -c 4 $host &> /dev/null
    do
        printf "%c" "."
    done
    printf "\n%s\n"  "$host is online"
}

waiting-mongo-master(){
    local host=${1:-"rs0_node1:27018"}
    printf "%s" "Waiting for ${host} become master ..."
    while ! mongo ${host} --eval 'db.isMaster().ismaster'|grep true &>/dev/null
    do
        printf "%c" "."
    done
    printf "\n%s\n"  "$host is master."
}
waiting-mongo-primary(){
    local host=${1:-"rs0_node1:27018"}
    printf "%s" "Waiting for ${host} primary elected ..."
    local primary=$(mongo ${host} --eval 'db.isMaster().primary' --quiet)
    while [ -z "$primary" ]
    do
        printf "%c" "."
        primary=$(mongo ${host} --eval 'db.isMaster().primary' --quiet)
    done
    
    printf "\n%s\n"  "${primary}  is primary."
}

init-mongo(){
    ping-server rs0_node1
    echo "initiate rs0"
    mongo --host rs0_node1:27018 /data/scripts/js/rs0-initiate.js
    waiting-mongo-primary rs0_node1:27018

    echo "create users in rs0"
    local primary=$(mongo rs0_node1:27018 --eval 'db.isMaster().primary' --quiet)
    waiting-mongo-master $primary
    mongo --host $primary /data/scripts/js/create-users.js

    echo "initiate rs1"    
    mongo --host rs1_node1:27018 /data/scripts/js/rs1-initiate.js
    waiting-mongo-primary rs1_node1:27018

    echo "create users in rs1"
    local primary=$(mongo rs1_node1:27018 --eval 'db.isMaster().primary' --quiet)
    waiting-mongo-master $primary
    mongo --host $primary /data/scripts/js/create-users.js

    echo "initiate cfg" 
    mongo --host cfg1:27019 /data/scripts/js/cfg-initiate.js
    waiting-mongo-primary cfg1:27019

    # echo "create users in cfg"
    # local primary=$(mongo cfg1:27019 --eval 'db.isMaster().primary' --quiet)
    # waiting-mongo-master $primary
    # mongo --host $primary /data/scripts/js/create-users.js
    
    ping-server mongos
    waiting-mongo-master mongos:27017
    mongo --host mongos:27017 /data/scripts/js/create-users.js
    mongo --host mongos:27017 /data/scripts/js/addShard.js
    mongo --host mongos:27017 /data/scripts/js/mydb-sharding.js
}
main(){
    init-mongo
    sleep infinity
}

main