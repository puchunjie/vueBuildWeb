#!/bin/sh
if [ -z "$1" ];then
    echo "输入一个版本号！！"
    exit
else
if [ -z "$2" ];then
    echo '注释必须写！';
    exit
else
echo "\033[0;33m"
cat<<EOT
                                  _oo0oo_
                                 088888880
                                 88" . "88
                                 (| -_- |)
                                  0\ = /0
                               ___/'---'\___
                             .' \\\\|     |// '.
                            / \\\\|||  :  |||// \\
                           /_ ||||| -:- |||||- \\
                          |   | \\\\\\  -  /// |   |
                          | \_|  ''\---/''  |_/ |
                          \  .-\__  '-'  __/-.  /
                        ___'. .'  /--.--\  '. .'___
                     ."" '<  '.___\_<|>_/___.' >'  "".
                    | | : '-  \'.;'\ _ /';.'/ - ' : | |
                    \  \ '_.   \_ __\ /__ _/   .-' /  /
                ====='-.____'.___ \_____/___.-'____.-'=====
                                  '=---='


              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                        佛祖保佑    iii    永不宕机
EOT
echo "\033[m"
svn revert --depth infinity dist
npm run build && \
svn add dist && \
svn copy dist https://192.168.40.82/svn/vueDemo/tags/release-$1 -m "$2" && \
svn revert --depth infinity dist && \
rm -rf dist
fi
fi