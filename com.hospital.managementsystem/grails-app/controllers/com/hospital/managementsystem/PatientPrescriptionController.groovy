package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PatientPrescriptionController {
    static scaffold = true
    static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]


 @Transactional
    def indexApi() {
        def patientPrescription = PatientPrescription.list()
        render patientPrescription as JSON
    }

def showApi(Long id) {
        def patientPrescriptionInstance = PatientPrescription.get(id)
        if (!patientPrescriptionInstance) {
            render status: BAD_REQUEST
            return
        }
        render patientPrescriptionInstance as JSON
    }

    @Transactional
    def createApi() {
        def newPatientPrescription = new PatientPrescription(params)
        newPatientPrescription.status = 1
        if (newPatientPrescription.save(flush: true)) {
            render status: CREATED, text: 'PatientPrescription created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create PatientPrescription '
        }
    }

    @Transactional
    def updateApi(Long id) {
        def patientPrescriptionInstance = PatientPrescription.get(id)
        if (!patientPrescriptionInstance) {
            render status: BAD_REQUEST
            return
        }
        patientPrescriptionInstance.properties = params
        if (patientPrescriptionInstance.save(flush: true)) {
            render status: CREATED, text: 'PatientPrescription Updated successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to update PatientPrescription'
        }
    }

    @Transactional
    def deleteApi(Long id) {
        def patientPrescriptionInstance = PatientPrescription.get(id)
        if (!patientPrescriptionInstance) {
            render status: BAD_REQUEST
            return
        }

        patientPrescriptionInstance.status = 0
        patientPrescriptionInstance.prescriptionNo = patientPrescriptionInstance.prescriptionNo + "_0"

        if (patientPrescriptionInstance.save(flush: true)) {
            render status: CREATED, text: 'PatientPrescription Deleted successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to delete PatientPrescription'
        }
    }
}