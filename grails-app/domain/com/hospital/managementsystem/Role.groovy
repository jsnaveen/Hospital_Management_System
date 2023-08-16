package com.hospital.managementsystem

class Role {
   
    String code
    String name
    Date dateCreated
	Date lastUpdated
    Integer status

    static hasMany = [userRoles: UserRole]

    static constraints = {
          code unique: true
    }
     

}
