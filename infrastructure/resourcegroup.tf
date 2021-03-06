resource "azurerm_resource_group" "skillsmatrix" {
  name     = var.resource_group_name
  location = var.resource_group_location
}

resource "azurerm_dns_zone" "skillsmatrix" {
  name                = var.domain_name
  resource_group_name = azurerm_resource_group.skillsmatrix.name
}

resource "azurerm_dns_cname_record" "app" {
  name                = "app"
  zone_name           = azurerm_dns_zone.skillsmatrix.name
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  ttl                 = 300
  record              = "skills-matrix-afd.azurefd.net"
}

resource "azurerm_dns_cname_record" "api" {
  name                = "api"
  zone_name           = azurerm_dns_zone.skillsmatrix.name
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  ttl                 = 300
  record              = "skills-matrix-afd.azurefd.net"
}

output "name_servers" {
  value = azurerm_dns_zone.skillsmatrix.name_servers
}

