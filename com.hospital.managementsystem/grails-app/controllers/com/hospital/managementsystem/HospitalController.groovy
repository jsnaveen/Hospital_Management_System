package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class HospitalController {

static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
def indexApi() {
        def hospitals = Hospital.list() 
        render hospitals as JSON
    }
@Transactional
    def showApi(Long id) {
        def hospitalInstance = Hospital.get(id)
        if (!hospitalInstance) {
             render status: BAD_REQUEST
            return
        }
        render hospitalInstance as JSON
    }


@Transactional
def createApi() {
    def newhospital = new Hospital(params)
    newhospital.status = 1
    if (newhospital.save(flush: true)) {
        render status: CREATED, text: 'Hospital created successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to create Hospital'
    }
}

@Transactional
    def updateApi(Long id) {
        def hospitalInstance = Hospital.get(id)
        
         if (!hospitalInstance) {
          render status: BAD_REQUEST
        return
    }

    hospitalInstance.properties = params

    if (hospitalInstance.save(flush: true)) {
        render status: CREATED, text: 'Hospital Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update Hospital'
    }     
    }

@Transactional
   def deleteApi(Long id) {
      def hospitalInstance = Hospital.get(id)
       if (!hospitalInstance) {
        render status: BAD_REQUEST
        return
      }

   hospitalInstance.status = 0
   hospitalInstance.code = hospitalInstance.code + "_0"

   if (hospitalInstance.save(flush: true)) {
       render status: CREATED, text: 'Hospital Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete Hospital'
   }  

}
}
