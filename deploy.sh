#!/bin/sh

az account set --subscription 3f1033da-99af-4a51-bbb6-ed2b0c0a1cf9
az acr login -n skillsmatrixacr

docker-compose build api
docker tag skillsmatrix_api:latest skillsmatrixacr.azurecr.io/skillsmatrix_api:latest
docker push skillsmatrixacr.azurecr.io/skillsmatrix_api:latest

docker-compose build app
docker tag skillsmatrix_app:latest skillsmatrixacr.azurecr.io/skillsmatrix_app:latest
docker push skillsmatrixacr.azurecr.io/skillsmatrix_app:latest

echo Restarting API
az webapp restart --resource-group skills-matrix-rg --name skills-matrix-api

echo Restarting APP
az webapp restart --resource-group skills-matrix-rg --name skills-matrix-app
