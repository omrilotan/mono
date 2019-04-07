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
		read -r -p "$(tput bold)username:$(tput sgr0) (octocat) " author
	fi

	if [[ -z "$message" ]]; then
		read -r -p "$(tput bold)commit message:$(tput sgr0) (random message) " message
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
git config user.name "$myname" --replace-all
git config user.email "$myemail" --replace-all
