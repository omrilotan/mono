message=${@:2}
git tag -a "$1" -m "$message"
git push origin "refs/tags/${1}"
echo "Added tag ${1} with message \"${message}\""
