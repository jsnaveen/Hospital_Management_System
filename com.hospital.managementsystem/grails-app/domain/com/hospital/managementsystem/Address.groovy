package com.hospital.managementsystem

class Address {
   
    String streetAddressLine1
    String streetAddressLine2
    String city
    String state
    String country
    String postalCode
    Date dateCreated
	Date lastUpdated
    Integer status

    static belongsTo = [userProfile: UserProfile]

    static constraint = {
        streetAddressLine1 nullable: false, maxSize: 200
        streetAddressLine2 nullable: false, maxSize: 200
        city nullable: false, maxSize: 100
        state nullable: false , maxSize: 100
        postalCode nullable: false, maxSize: 6 
        country nullable: false, maxSize: 100
    }


}
