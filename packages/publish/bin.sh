#!/usr/bin/env bash

function publish {
	local NAME=$(cat package.json | jq -r ".name")
	local VERSION=$(cat package.json | jq -r ".version")

	echo "Check if ${NAME}@${VERSION} was published"
	local EXISTS=$(npm view ${NAME}@${VERSION} version)

	if [[ -z $EXISTS ]]; then
		npm publish
	else
		echo "This version was already published"
		exit 0
	fi
}
publish
