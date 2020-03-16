FROM alpine:3.9
LABEL maintainer="lzn"
RUN echo "https://mirrors.aliyun.com/alpine/v3.9/community/" > /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.9/main/" >> /etc/apk/repositories \
    && apk update && apk add  --no-cache bash libgcc  mongodb=4.0.5-r0