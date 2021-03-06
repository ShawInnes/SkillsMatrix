
resource "random_id" "storage_account" {
  byte_length = 4
}

resource "azurerm_storage_account" "skillsmatrix" {
  name                = "skillsmatrix${lower(random_id.storage_account.hex)}"
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  location            = azurerm_resource_group.skillsmatrix.location

  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}


output "endpoint" {
  value = azurerm_storage_account.skillsmatrix.primary_web_endpoint
}
