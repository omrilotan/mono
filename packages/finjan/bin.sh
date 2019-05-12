DIR="$(dirname "$(readlink -f "$BASH_SOURCE")")"
node --experimental-modules --es-module-specifier-resolution=node "$DIR/bin.mjs" $@ --color
