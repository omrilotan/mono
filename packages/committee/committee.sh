args=$@
if [[ $args == *"--automate"* ]]; then
	automate=true
	args=${args/--automate}
fi

args=( $args )
author=${args[0]}
message=${args[@]:1}

if [[ -z $automate ]]; then
	if [[ -z "$author" ]]; then
		echo -n "username: "
		read username
		author=$username
	fi

	if [[ -z "$message" ]]; then
		echo -n "commit message: "
		read message
	fi
fi

: ${author:="octocat"}
: ${message:="$(curl -s whatthecommit.com/index.txt)"}
echo "I will now commit as $author: $message"
myname=$(git config user.name)
myemail=$(git config user.email)
git config user.name $author --replace-all
git config user.email "${author}@users.noreply.github.com" --replace-all
git commit -m "$message"
git config user.name $myname --replace-all
git config user.email $myemail --replace-all
