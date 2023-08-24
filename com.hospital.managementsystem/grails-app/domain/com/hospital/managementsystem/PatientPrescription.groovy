package com.hospital.managementsystem

import grails.persistence.Entity

@Entity
class PatientPrescription {

    String medication
    String prescriptionNo
    Date prescriptionDate
    String therapistName
    String therapistInstructions
    String therapyMode
    Integer status
    Date dateCreated
    Date lastUpdated

    static belongsTo = [patientProfile: PatientProfile]

    static constraints = {
        therapistInstructions nullable: true
        therapyMode inList: ['DigitalTherapy', 'HospitalTherapy']
    }

    
    def afterInsert() {
        createPrescriptionHistory()
    }

    private void createPrescriptionHistory() {
        PrescriptionHistory.withNewSession {
            def history = new PrescriptionHistory(
                medication: medication,
                prescriptionNo: prescriptionNo,
                prescriptionDate: prescriptionDate,
                therapistName: therapistName,
                therapistInstructions: therapistInstructions,
                therapyMode: therapyMode,
                status: status,
                dateCreated: dateCreated,
                lastUpdated: lastUpdated,
                patientPrescription: this
            )
            history.save(flush: true)
        }
    }
}
