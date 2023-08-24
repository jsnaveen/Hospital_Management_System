package com.hospital.managementsystem


import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional
import grails.converters.JSON


@Transactional(readOnly = true)
class PatientProfileController {

    static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
    def indexApi() {
        def patientProfiles = PatientProfile.list() 
        render patientProfiles as JSON
    }
@Transactional
    def showApi(Long id) {
        def patientProfileInstance = PatientProfile.get(id)
        if (!patientProfileInstance) {
                       render status: BAD_REQUEST
                       return
        } 
        render patientProfileInstance as JSON
    }
@Transactional
    def createApi() {
        def newpatientProfile = new PatientProfile(params)
        newpatientProfile.status = 1
        if (newpatientProfile.save(flush: true)) {
            render status: CREATED, text: 'PatientProfile created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create PatientProfile'
        }
    }

@Transactional
    def updateApi(Long id) {
        def patientProfileInstance = PatientProfile.get(id)
        
        if (!patientProfileInstance) {
            render status: BAD_REQUEST
            return
    }

   patientProfileInstance.properties = params

    if (patientProfileInstance.save(flush: true)) {
        render status: CREATED, text: 'PatientProfile Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update PatientProfile'
    }     
    }

    @Transactional
   def deleteApi(Long id) {
      def patientProfileInstance = PatientProfile.get(id)
       if (!patientProfileInstance) {
        render status: BAD_REQUEST
        return
      }

   patientProfileInstance.status = 0
   patientProfileInstance.patientId = patientProfileInstance.patientId + "_0"

   if (patientProfileInstance.save(flush: true)) {
       render status: CREATED, text: 'PatientProfile Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete PatientProfile'
   }  

}

}