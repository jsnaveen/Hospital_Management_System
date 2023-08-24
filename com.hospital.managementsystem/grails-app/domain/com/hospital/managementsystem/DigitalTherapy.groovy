package com.hospital.managementsystem

class DigitalTherapy {

    String code 
    String therapistName
    Date sessionStartDate
    Date sessionEndDate
    Date sessionCompletedDate
    String sessionNotes
    Integer status
    Date dateCreated
    Date lastUpdated

    //static hasMany = [hospitalTherapies: HospitalTherapy]
    static belongsTo = [product: Product , patientProfile: PatientProfile]

    static constraints = {
        code unique: true
        sessionNotes maxSize: 1000
    }
}
