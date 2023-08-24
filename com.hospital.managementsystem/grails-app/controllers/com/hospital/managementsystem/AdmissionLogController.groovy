package com.hospital.managementsystem


import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class AdmissionLogController {

static allowedMethods = [indexApi: "GET", showApi: "GET",createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
def indexApi() {
        def admissionLog = AdmissionLog.list() 
        render admissionLog as JSON
    }

@Transactional
    def showApi(Long id) {
        def admissionLogInstance = AdmissionLog.get(id)
        if (!admissionLogInstance) {
             render status: BAD_REQUEST
             return
        } 
        render admissionLogInstance as JSON
    }

@Transactional
    def createApi() {
        def newadmissionLog = new AdmissionLog(params)
        newadmissionLog.status = 1
        if (newadmissionLog.save(flush: true)) {
            render status: CREATED, text: 'AdmissionLog created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create AdmissionLog'
        }
    }

@Transactional
    def updateApi(Long id) {
        def admissionLogInstance = AdmissionLog.get(id)
         if (!admissionLogInstance) {
        render status: BAD_REQUEST
        return
    }

    admissionLogInstance.properties = params

    if (admissionLogInstance.save(flush: true)) {
        render status: CREATED, text: 'AdmissionLog Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update AdmissionLog'
    }     
    }

@Transactional
   def deleteApi(Long id) {
      def admissionLogInstance = AdmissionLog.get(id)
       if (!admissionLogInstance) {
        render status: BAD_REQUEST
        return
      }

   admissionLogInstance.status = 0
   admissionLogInstance.admissionNo = admissionLogInstance.admissionNo + "_0"

   if (admissionLogInstance.save(flush: true)) {
       render status: CREATED, text: 'AdmissionLog Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete AdmissionLog'
   }  

 }
}
