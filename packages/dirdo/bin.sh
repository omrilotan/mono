#!/bin/bash

DIRECTORY=$1
shift
ACTION=$@

function iterate {
	for FILE in `ls -l ${1}`
	do
		if test -d "${1}/${FILE}"; then
			execute "${1}/${FILE}"
		fi
	done
}

function execute {
	echo -e "\033[1mExecuting in ${1}\033[0m"
	cd $1
	eval $ACTION
	cd -
}

iterate $DIRECTORY
