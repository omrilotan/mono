as=$1
if [[ -z "$as" ]]; then
	echo -n "username: "
	read username
	as=$username
fi
if [[ -z "$as" ]]; then
	as="octocat"
fi
shift
message=$@
if [[ -z "$message" ]]; then
	echo -n "commit message: "
	read message
fi
: ${message:="$(curl -s whatthecommit.com/index.txt)"}
echo "I will now commit as $as: $message"
myname=$(git config user.name)
myemail=$(git config user.email)
git config user.name $as --replace-all
git config user.email "${as}@users.noreply.github.com" --replace-all
git commit -m "$message"
git config user.name $myname --replace-all
git config user.email $myemail --replace-all
