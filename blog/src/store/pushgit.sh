#! /bin/bash
# 切换到用户目录
cd ~
cd /Documents/node-react-typescript-blog/blog
#运行构建
yarn build
cp -r -f /build/  /Documents/myblog/app/
# 执行git命令
git add .
git commit -m 'auto update'
git push origin master
echo `执行时间记录`
date
exit 0
