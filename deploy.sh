#!/bin/sh

az account set --subscription 3f1033da-99af-4a51-bbb6-ed2b0c0a1cf9

HASH=`git rev-parse --short HEAD`

az storage copy --recursive --source "build/*" --account-name skillsmatrix57a70ca2 --destination-container \$web
