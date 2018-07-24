#!/bin/bash

function search {
	for FILE in `ls -l ${1}`
	do
		if test -d "${1}/${FILE}"; then
			echo -e "\033[1mWriting docs for ${FILE}\033[0m\n"
			cd "${1}/${FILE}"
			eval "../../packages/markt/bin/markt --destination ../../docs/${FILE}/index.html --template ../../src/index.html --title ${FILE}"
			cd -
		fi
	done
}

search "packages"
