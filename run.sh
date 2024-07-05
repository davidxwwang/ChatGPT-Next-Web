#!/bin/bash
cd /home/admin/ChatGPT-Next-Web
# 搜索容器 ID
container_id=$(sudo docker ps -q --filter "ancestor=xwwang0102/my_centos_with_node_py:v0.1")

if [ -z "$container_id" ]; then
  echo "未找到名为 xwwang0102/my_centos_with_node_py:v0.1 的正在运行的容器"
  exit 1
fi

# 进入容器并执行命令
sudo docker exec -it $container_id bash -c "
  cd /usr/src/app/ChatGPT-Next-Web &&
  pid=\$(fuser -n tcp 3000 2>/dev/null) &&
  if [ ! -z \"\$pid\" ]; then
    echo '杀死进程' \$pid &&
    kill -9 \$pid
  else
    echo '没有找到监听3000端口的进程'
  fi &&
  rm -rf ./.next &&
  echo '.next 目录已删除'
"

echo "完成"
