
# azure container registry, enable admin account
# app service plan, linux, b1
# linux app, docker image, skills-matrix-api
# linux app, docker image, skills-matrix-app
/*
settings 
*/

resource "azurerm_app_service_plan" "skillsmatrix" {
  name                = "skills-matrix-plan"
  location            = azurerm_resource_group.skillsmatrix.location
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }
}


resource "azurerm_app_service" "skillsmatrix" {
  name                = "skills-matrix-api"
  location            = azurerm_resource_group.skillsmatrix.location
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  app_service_plan_id = azurerm_app_service_plan.skillsmatrix.id

  site_config {
    linux_fx_version = "DOTNETCORE|5.0"
    scm_type         = "LocalGit"
  }

  app_settings = {
    "GREMLIN__USEGREMLINSERVER" = false
    "GREMLIN__HOST"             = var.gremlin_host
    "GREMLIN__PRIMARYKEY"       = var.gremlin_primarykey
    "GREMLIN__DATABASENAME"     = var.gremlin_databasename  # azurerm_cosmosdb_gremlin_database.skillsmatrix.name
    "GREMLIN__CONTAINERNAME"    = var.gremlin_containername # azurerm_cosmosdb_gremlin_graph.skillsmatrix.name
    "PROJECT"                   = "api/SkillsMatrix.Api/SkillsMatrix.Api.csproj"
  }
}

output "default_site_hostname" {
  value = azurerm_app_service.skillsmatrix.default_site_hostname
}

output "source_control" {
  value = azurerm_app_service.skillsmatrix.source_control
}

