#!/bin/bash
# Create By lzn

compose-files(){
  local compose_files=${1:-""}
  for sr in $(ls services)
  do
      if [[ -f  services/$sr/docker-compose.yml ]];then      
        compose_files=" $compose_files -f services/$sr/docker-compose.yml "
      elif [[ -d services/$sr ]];then
        for d in $(ls services/$sr)
        do
          if [[ -f services/$sr/$d/docker-compose.yml ]];then
            compose_files=" $compose_files -f services/$sr/$d/docker-compose.yml "
          fi
      fi
  done
  echo " $compose_files "
}

up(){
  local compose_files=$(compose-files ${1:-""})
  docker-compose -f docker-compose.yml $compose_files  up -d
}

ps(){
  local compose_files=$(compose-files ${1:-""})
  docker-compose -f docker-compose.yml  $compose_files ps
}
logs(){
  local srv_name=${1:=""}
  local compose_files=$(compose-files ${2:-""})
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