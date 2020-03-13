#!/bin/bash
# Create By lzn

compose-files(){
  local tct_compose_files=${1:-""}
  for sr in $(ls tct)
  do
      if [[ -f  tct/$sr/docker-compose.yml ]];then      
        tct_compose_files=" $tct_compose_files -f tct/$sr/docker-compose.yml "
      fi
  done
  local base_srv_composes=" -f redis/docker-compose.yml -f mongodb/docker-compose.yml -f seaweedfs/docker-compose.yml  
  -f nsq/docker-compose.yml -f nats/docker-compose.yml -f mosquitto/docker-compose.yml "
  echo " $base_srv_composes $tct_compose_files -f nginx/docker-compose.yml "
}

chown-mosquitto(){
  chmod 777 -R  mosquitto/log
}
up(){
  local tct_compose_files=${1:-""}
  local compose_files=$(compose-files $tct_compose_files)
  chown-mosquitto
  docker-compose -f docker-compose.yml $compose_files  -f tct/acs/docker-compose.yml -f tct/i18ns/docker-compose.yml up -d
}


ps(){
  local tct_compose_files=${1:-""}
  local compose_files=$(compose-files $tct_compose_files)
  docker-compose -f docker-compose.yml  $compose_files ps
}
logs(){
  local srv_name=${1:=""}
  local tct_compose_files=${2:-""}
  local compose_files=$(compose-files $tct_compose_files)
  docker-compose -f docker-compose.yml  $compose_files logs $srv_name
}

main(){
  if [ "$(type -t $1)" = 'function' ];then
    $1 $2
  else
      docker-compose -f docker-compose.yml  $(compose-files) $*
  fi

}

main "$*"