package com.hospital.managementsystem

class UserRole {
   
    
    Date dateCreated
    Date lastUpdated
    Integer status

    static belongsTo = [userProfile: UserProfile, role: Role]

    static constraint = {
        userProfile unique: 'role'
    }
}