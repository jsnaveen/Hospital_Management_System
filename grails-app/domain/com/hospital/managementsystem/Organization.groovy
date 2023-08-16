package com.hospital.managementsystem

class Organization {

    String name 
    String code
    String location
    Date dateCreated
	Date lastUpdated
    Integer status

    static hasMany = [trustorganizations: TrustOrganization, hospitals: Hospital]

    static constraints = {
         code unique: true
    }
}


