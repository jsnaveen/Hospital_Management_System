package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TrustOrganizationController {

static allowedMethods = [indexApi: "GET", showApi: "GET", saveApi: "POST",createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
 def indexApi() {
        def trustOrganizations = TrustOrganization.list() 
        render trustOrganizations as JSON
    }
@Transactional
    def showApi(Long id) {
        def trustOrganizationInstance = TrustOrganization.get(id)
        if (!trustOrganizationInstance) {
            render status: BAD_REQUEST
            return
        }
        render trustOrganizationInstance as JSON
    }


@Transactional
    def createApi() {
        def newTrustOrganization = new TrustOrganization(params)
        newTrustOrganization.status = 1
        if (newTrustOrganization.save(flush: true)) {
            render status: CREATED, text: 'TrustOrganization created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create Trustorganization'
        }
    }

@Transactional
    def updateApi(Long id) {
        def trustOrganizationInstance = TrustOrganization.get(id)
         if (!trustOrganizationInstance) {
        render status: BAD_REQUEST
        return
    }

    trustOrganizationInstance.properties = params

    if (trustOrganizationInstance.save(flush: true)) {
        render status: CREATED, text: 'TrustOrganization Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update TrustOrganization'
    }     
    }

@Transactional
   def deleteApi(Long id) {
      def trustOrganizationInstance = TrustOrganization.get(id)
       if (!trustOrganizationInstance) {
        render status: BAD_REQUEST
        return
      }

//    trustOrganizationInstance.status = 0
//    trustOrganizationInstance.status = trustOrganizationInstance.status + "_0"

   if (trustOrganizationInstance.save(flush: true)) {
       render status: CREATED, text: 'TrustOrganization Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete TrustOrganization'
   }  
 }   
}
