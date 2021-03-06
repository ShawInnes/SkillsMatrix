
resource "azurerm_cosmosdb_account" "skillsmatrix" {
  name                = "skills-matrix-cosmosdb"
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
  name                = "skills-matrix-db"
  resource_group_name = azurerm_cosmosdb_account.skillsmatrix.resource_group_name
  account_name        = azurerm_cosmosdb_account.skillsmatrix.name
}

resource "azurerm_cosmosdb_gremlin_graph" "skillsmatrix" {
  name                = "skills-matrix-graph"
  resource_group_name = azurerm_cosmosdb_account.skillsmatrix.resource_group_name
  account_name        = azurerm_cosmosdb_account.skillsmatrix.name
  database_name       = azurerm_cosmosdb_gremlin_database.skillsmatrix.name
  partition_key_path  = "/Company"

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

output "primary_key" {
  value = azurerm_cosmosdb_account.skillsmatrix.primary_key
}

output "connection_strings" {
  value = azurerm_cosmosdb_account.skillsmatrix.connection_strings
}

output "container_name" {
  value = azurerm_cosmosdb_gremlin_graph.skillsmatrix.name
}

output "database_name" {
  value = azurerm_cosmosdb_gremlin_database.skillsmatrix.name
}

