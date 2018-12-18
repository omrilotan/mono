as=$1
shift
message=$@
echo "I will now commit as $as: $message"
myname=$(git config user.name)
myemail=$(git config user.email)
git config user.name $as --replace-all
git config user.email "${as}@users.noreply.github.com" --replace-all
git commit -m "$message"
git config user.name $myname --replace-all
git config user.email $myemail --replace-all
