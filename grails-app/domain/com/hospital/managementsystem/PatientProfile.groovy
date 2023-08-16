package com.hospital.managementsystem

class PatientProfile {

    String patientId
    String medicalRecordNo
    Date dateCreated
	Date lastUpdated
    Integer status
    
    static belongsTo = [userProfile: UserProfile]
    static hasMany = [hospitals: Hospital, admissionLogs: AdmissionLog]

    static constraints = {
        
        medicalRecordNo unique: true
    }
}
