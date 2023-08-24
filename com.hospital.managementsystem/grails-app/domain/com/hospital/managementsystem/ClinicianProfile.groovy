package com.hospital.managementsystem

class ClinicianProfile {

    String clinicianId
    String licenseNumber
    Date dateCreated
	Date lastUpdated
    Integer status
    
    static belongsTo = [userProfile: UserProfile]
    static hasMany = [trusts: Trust, organizations: Organization, hospitals: Hospital]

    static constraints = {
        clinicianId unique: true
        licenseNumber unique: true
    }
}
