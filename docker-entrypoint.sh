#!/bin/sh
set -e

WORKDIR=`/bin/pwd`
echo "SPA_BASE_URL=${SPA_BASE_URL}"
SPA_BASE_URL=${SPA_BASE_URL//\//\\/}

echo "CMS_BASE_URL=${CMS_BASE_URL}"
CMS_BASE_URL=${CMS_BASE_URL//\//\\/}

echo "PORT=${PORT}"

echo "Configuration"
echo "WORKDIR=$WORKDIR"
find -type f -name "*.html" -exec sed -i -r 's/SPA_BASE_URL/'"${SPA_BASE_URL}"'/g' {} \;
find -type f -name "*.css" -exec sed -i -r 's/SPA_BASE_URL/'"${SPA_BASE_URL}"'/g' {} \;
find -type f -name "*.js" -exec sed -i -r 's/SPA_BASE_URL/'"${SPA_BASE_URL}"'/g' {} \;
find -type f -name "*.json" -exec sed -i -r 's/SPA_BASE_URL/'"${SPA_BASE_URL}"'/g' {} \;
find -type f -name "*.pack" -exec sed -i -r 's/SPA_BASE_URL/'"${SPA_BASE_URL}"'/g' {} \;

find -type f -name "*.html" -exec sed -i -r 's/CMS_BASE_URL/'"${CMS_BASE_URL}"'/g' {} \;
find -type f -name "*.css" -exec sed -i -r 's/CMS_BASE_URL/'"${CMS_BASE_URL}"'/g' {} \;
find -type f -name "*.js" -exec sed -i -r 's/CMS_BASE_URL/'"${CMS_BASE_URL}"'/g' {} \;
find -type f -name "*.json" -exec sed -i -r 's/CMS_BASE_URL/'"${CMS_BASE_URL}"'/g' {} \;
find -type f -name "*.pack" -exec sed -i -r 's/CMS_BASE_URL/'"${CMS_BASE_URL}"'/g' {} \;

# Run command with node if the first argument contains a "-" or is not a system command. The last
# part inside the "{}" is a workaround for the following bug in ash/dash:
# https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=874264

echo "Start server"
cd $WORKDIR
if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ] || { [ -f "${1}" ] && ! [ -x "${1}" ]; }; then
  set -- node "$@"
fi

exec "$@"
