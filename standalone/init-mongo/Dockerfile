FROM mongo:4.0
LABEL maintainer="lzn"
RUN rm -f /etc/apt/sources.list.d/mongodb-org.list && apt-get update && apt-get install inetutils-ping -y
HEALTHCHECK --interval=60s --timeout=60s CMD bash /data/scripts/sharded-cluster-check.sh