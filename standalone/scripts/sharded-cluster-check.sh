#!/bin/bash
# Create By lzn

set -e

check-rs(){
  local host=${1:="rs0_node1:27018"}
  local primary=$(mongo $host --eval 'db.isMaster().primary' --quiet)
  if [ -n "$primary" ]; then
    local master=$(mongo $primary --eval 'db.isMaster().ismaster' --quiet)
    if [ $master == "true" ];then
      return 0
    fi      
  fi
  return 1
}

main(){
  check-rs rs0_node1:27018
  check-rs rs1_node1:27018
  check-rs cfg1:27019
}
main