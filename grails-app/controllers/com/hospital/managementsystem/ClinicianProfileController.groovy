package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ClinicianProfileController {

    static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
    def indexApi() {
        def clinicianProfiles = ClinicianProfile.list() 
        render clinicianProfiles as JSON
    }
@Transactional
    def showApi(Long id) {
        def clinicianProfileInstance = ClinicianProfile.get(id)
        if (!clinicianProfileInstance) {
            render status: BAD_REQUEST
            return
        } 
        render clinicianProfileInstance as JSON
    }

@Transactional
def createApi() {
    def newclinicianProfile = new ClinicianProfile(params)
    newclinicianProfile.status = 1
        if (newclinicianProfile.save(flush: true)) {
            render status: CREATED, text: 'ClinicianProfile created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create ClinicianProfile'
        }
    }


@Transactional
    def updateApi(Long id) {
        def clinicianProfileInstance = ClinicianProfile.get(id)
         if (!clinicianProfileInstance) {
        render status: BAD_REQUEST
        return
    }

   clinicianProfileInstance.properties = params

    if (clinicianProfileInstance.save(flush: true)) {
        render status: CREATED, text: 'ClinicianProfile Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update ClinicianProfile'
    }     
    }

    @Transactional
   def deleteApi(Long id) {
      def clinicianProfileInstance = ClinicianProfile.get(id)
       if (!clinicianProfileInstance) {
        render status: BAD_REQUEST
        return
      }

   clinicianProfileInstance.status = 0
   clinicianProfileInstance.clinicianId = clinicianProfileInstance.clinicianId + "_0"

   if (clinicianProfileInstance.save(flush: true)) {
       render status: CREATED, text: 'ClinicianProfile Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete ClinicianProfile'
   }  
 }
}