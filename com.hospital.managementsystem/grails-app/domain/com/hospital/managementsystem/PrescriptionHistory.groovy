package com.hospital.managementsystem

class PrescriptionHistory {

    String medication
    String prescriptionNo
    Date prescriptionDate
    String therapistName
    String therapistInstructions
    String therapyMode
    Integer status
    Date dateCreated
    Date lastUpdated

    static belongsTo = [patientPrescription: PatientPrescription]

}
