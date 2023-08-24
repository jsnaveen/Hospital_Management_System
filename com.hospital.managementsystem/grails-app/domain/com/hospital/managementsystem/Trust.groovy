package com.hospital.managementsystem

class Trust {

    String name
    String code
    String location
    Date dateCreated
	Date lastUpdated
    Integer status

    static hasMany = [trustorganizations: TrustOrganization]
     
    static constraints = {
        code unique: true
    }
}