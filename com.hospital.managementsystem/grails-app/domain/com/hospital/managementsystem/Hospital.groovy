package com.hospital.managementsystem

class Hospital {

    String name
    String code
    String location
    Date dateCreated
	Date lastUpdated
    Integer status 

    static belongsTo = [trust: Trust]

    static hasMany = [admissionLogs: AdmissionLog]
    
    static constraints = {
        code unique: true

    }
}
