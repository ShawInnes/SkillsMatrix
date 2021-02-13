resource "azurerm_resource_group" "skillsmatrix" {
  name     = var.resource_group_name
  location = var.resource_group_location
}

resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

resource "azurerm_cosmosdb_account" "skillsmatrix" {
  name                = "skillsmatrix-cosmosdb-${random_integer.ri.result}"
  location            = azurerm_resource_group.skillsmatrix.location
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  enable_automatic_failover = false

  capabilities {
    name = "EnableGremlin"
  }

  consistency_policy {
    consistency_level       = "Session"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = azurerm_resource_group.skillsmatrix.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_gremlin_database" "skillsmatrix" {
  name                = "***REMOVED***"
  resource_group_name = azurerm_cosmosdb_account.skillsmatrix.resource_group_name
  account_name        = azurerm_cosmosdb_account.skillsmatrix.name
  throughput          = 400
}

resource "azurerm_cosmosdb_gremlin_graph" "skillsmatrix" {
  name                = "skillsmatrix-gremlin-graph"
  resource_group_name = azurerm_cosmosdb_account.skillsmatrix.resource_group_name
  account_name        = azurerm_cosmosdb_account.skillsmatrix.name
  database_name       = azurerm_cosmosdb_gremlin_database.skillsmatrix.name
  partition_key_path  = "/Company"
  throughput          = 400

  index_policy {
    automatic      = true
    indexing_mode  = "Consistent"
    included_paths = ["/*"]
    excluded_paths = ["/\"_etag\"/?"]
  }

  conflict_resolution_policy {
    mode                     = "LastWriterWins"
    conflict_resolution_path = "/_ts"
  }
}

output "endpoint" {
  value = azurerm_cosmosdb_account.skillsmatrix.endpoint
}

output "primary_key" {
  value = azurerm_cosmosdb_account.skillsmatrix.primary_key
}

output "connection_strings" {
  value = azurerm_cosmosdb_account.skillsmatrix.connection_strings
}
