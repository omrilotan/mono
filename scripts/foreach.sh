#!/bin/bash

ACTION=$1

function search {
	for FILE in `ls -l ${1}`
	do
		if test -d "${1}/${FILE}"; then
			execute "${1}/${FILE}"
		fi
	done
}

function execute {
	echo -e "\033[1mExecuting ${1}\033[0m"
	cd $1
	eval $ACTION
	cd -
	echo -e "\n"
}


search "packages"
