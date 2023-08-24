package com.hospital.managementsystem

class TrustOrganization {

    Date dateCreated
    Date lastUpdated
    Integer status
    
    static belongsTo = [trust: Trust, organization: Organization]

    static constraint = {
        trust unique: 'Organization'
    }
}
