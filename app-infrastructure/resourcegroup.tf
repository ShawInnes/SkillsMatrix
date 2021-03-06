resource "azurerm_resource_group" "skillsmatrix" {
  name     = var.resource_group_name
  location = var.resource_group_location
}
