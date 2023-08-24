package com.hospital.managementsystem

class UserProfile {
 
   String email
   String password
   String uuid 
   String accessToken
   String title
   String firstName
   String lastName
   String dob 
   String gender
   String phoneNumber
   Date dateCreated
   Date lastUpdated 
   Integer status


    static hasMany = [userRoles: UserRole, clinicianProfiles: ClinicianProfile, addresses: Address]

    static constraints = {

        email email: true
        password size: 5..15, password: true
        uuid unique: true
        title inList:["Dr","Mr","Mrs","Miss"]
        firstName size:3..20
        lastName size:3..20
        gender inList:["Male","Female","Other"]
        phoneNumber phone: true, nullable: true
    }
}
