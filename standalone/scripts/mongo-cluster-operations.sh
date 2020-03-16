#!/bin/bash


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

docker-exec-js-base(){
    local grep_cond=$1
    local port=$2
    local js_filename=$3
    local container_id=$(docker ps --filter name=${grep_cond} -q)
    echo "====Exec ${js_filename} in ${grep_cond}[${container_id}].===="
    docker cp $(find_base_dir)/js/${js_filename} ${container_id}:/home/
    docker exec $container_id bash -c "mongo --port ${port} /home/${js_filename}"
    echo "====End exec ${js_filename} in ${grep_cond}[${container_id}].===="
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
waiting-master(){
    local container=${1:-mongo-rs0-node1}
    local port=${2:-27018}
    printf "%s" "Waiting for ${container} become master ..."
    while ! docker exec  ${container} bash -c "mongo --port ${port} --eval 'db.isMaster().ismaster'"|grep true &>/dev/null
    do
        printf "%c" "."
    done
    printf "\n%s\n"  "$container is master."
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
    while ! mongo ${host} --eval 'db.isMaster().primary' --quiet &>/dev/null
    do
        printf "%c" "."
    done
    
    printf "\n%s\n"  "$(mongo ${host} --eval 'db.isMaster().primary' --quiet) is primary."
}
docker-init-mongo(){
    ping-server rs0_node1
    mongo --host rs0_node1:27018 /data/scripts/js/rs0-initiate.js
    waiting-mongo-master rs0_node1:27018

    # mongo --host rs1_node1:27018 /data/scripts/js/rs1-initiate.js
    # waiting-mongo-master rs1_node1:27018

    # mongo --host rs1_node1:27018 /data/scripts/js/create-users.js

    # mongo --host cfg1:27019 /data/scripts/js/cfg-initiate.js
    # waiting-mongo-master cfg1:27019
    # ping-server mongos
    # waiting-mongo-master mongos:27017
    # mongo --host mongos:27017 /data/scripts/js/create-users.js
    # mongo --host mongos:27017 /data/scripts/js/addShard.js
    # mongo --host mongos:27017 /data/scripts/js/mydb-sharding.js
}
main(){
    # rs0-initiate mongo-rs0-node1:27018
    # rs1-initiate mongo-rs1-node1:27018
    # cfg-initiate cfg1:27019
    # sleep 15
    # rs_create_users
    # mongos_create_users
    # add_shards 10.0.0.21 27017
    # ocsp_sharding 10.0.0.21 27017

    docker-init-mongo
    sleep infinity
}

main