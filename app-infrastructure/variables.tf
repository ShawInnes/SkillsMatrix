
variable "resource_group_name" {
  type    = string
  default = "skills-matrix-rg"
}

variable "resource_group_location" {
  type    = string
  default = "australiaeast"
}

variable "domain_name" {
  type    = string
  default = "skillsmatrix.arkava.io"
}

variable "gremlin_host" {
  type = string
}

variable "gremlin_primarykey" {
  type = string
}

variable "gremlin_databasename" {
  type = string
}

variable "gremlin_containername" {
  type = string
}
