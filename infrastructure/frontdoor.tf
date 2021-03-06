resource "azurerm_frontdoor" "skillsmatrix" {
  name                                         = "skills-matrix-afd"
  resource_group_name                          = azurerm_resource_group.skillsmatrix.name
  enforce_backend_pools_certificate_name_check = false

  routing_rule {
    name               = "app-http"
    accepted_protocols = ["Http"]
    patterns_to_match  = ["/*"]
    frontend_endpoints = ["app"]
    redirect_configuration {
      redirect_type     = "Found"
      redirect_protocol = "HttpsOnly"
    }
  }

  routing_rule {
    name               = "app-https"
    accepted_protocols = ["Https"]
    patterns_to_match  = ["/*"]
    frontend_endpoints = ["app"]
    forwarding_configuration {
      forwarding_protocol = "HttpsOnly"
      backend_pool_name   = "app"
    }
  }

  backend_pool_load_balancing {
    name = "app"
  }

  backend_pool_health_probe {
    name    = "app"
    enabled = false
  }

  backend_pool {
    name = "app"

    backend {
      host_header = azurerm_storage_account.skillsmatrix.primary_web_host
      address     = azurerm_storage_account.skillsmatrix.primary_web_host
      http_port   = 80
      https_port  = 443
    }

    load_balancing_name = "app"
    health_probe_name   = "app"
  }

  frontend_endpoint {
    name      = "app-afd"
    host_name = "skills-matrix-afd.azurefd.net"
  }

  frontend_endpoint {
    name      = "app"
    host_name = "app.${var.domain_name}"
  }

  frontend_endpoint {
    name      = "api"
    host_name = "api.${var.domain_name}"
  }

  depends_on = [
    azurerm_dns_cname_record.app,
    azurerm_dns_cname_record.api,
  ]
}

resource "azurerm_frontdoor_custom_https_configuration" "skillsmatrix_app" {
  frontend_endpoint_id              = azurerm_frontdoor.skillsmatrix.frontend_endpoints["app"]
  resource_group_name               = azurerm_frontdoor.skillsmatrix.resource_group_name
  custom_https_provisioning_enabled = true
  custom_https_configuration {
    certificate_source = "FrontDoor"
  }
}

resource "azurerm_frontdoor_custom_https_configuration" "skillsmatrix_api" {
  frontend_endpoint_id              = azurerm_frontdoor.skillsmatrix.frontend_endpoints["api"]
  resource_group_name               = azurerm_frontdoor.skillsmatrix.resource_group_name
  custom_https_provisioning_enabled = true
  custom_https_configuration {
    certificate_source = "FrontDoor"
  }
}


