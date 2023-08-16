package com.hospital.managementsystem

class AdmissionLog {

    Date patientAdmissionDateAndTime
    String admissionNotes
    String admissionNo
    Date patientDischargeDateAndTime
    Date dateCreated
	Date lastUpdated
    Integer status

    static belongsTo = [patientProfile: PatientProfile, hospital: Hospital]

    static constraint = {
        admissionNotes nullable: true, maxSize: 1000
        patientProfile unique: 'patientAdmissionDateTime'
        patientAdmissionDateAndTime nullable: true
        patientDischargeDateAndTime nullable: true
    }
}
