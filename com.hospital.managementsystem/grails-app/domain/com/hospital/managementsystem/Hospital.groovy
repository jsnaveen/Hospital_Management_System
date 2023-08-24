package com.hospital.managementsystem

class Hospital {

    String name
    String code
    String location
    Date dateCreated
	Date lastUpdated
    Integer status 

    static belongsTo = [organizations: Organization]

    static hasMany = [admissionLogs: AdmissionLog]
    
    static constraints = {
        code unique: true
    }
}
