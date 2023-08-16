package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class OrganizationController {

static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
 def indexApi() {
        def organizations = Organization.list() 
        render organizations as JSON
    }

@Transactional
def showApi(Long id) {
        def organizationInstance = Organization.get(id)
        if (!organizationInstance) {
            render status: BAD_REQUEST
            return
        }
        render organizationInstance as JSON
    }

@Transactional
def createApi() {
        def newOrganization = new Organization(params)
        
        newOrganization.status = 1
        if (newOrganization.save(flush: true)) {
            render status: CREATED, text: 'Organization created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create organization'
        }
    }

@Transactional
def updateApi(Long id) {
    def organizationInstance = Organization.get(id)
       
    if (!organizationInstance) {
        render status: BAD_REQUEST
            return
    }

    organizationInstance.properties = params

    if (organizationInstance.save(flush: true)) {
        render status: CREATED, text: 'Organization Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update Organization'
    }     
 }

@Transactional
   def deleteApi(Long id) {
      def organizationInstance = Organization.get(id)
       if (!organizationInstance) {
        render status: BAD_REQUEST
        return
      }

   organizationInstance.status = 0
   organizationInstance.code = organizationInstance.code + "_0"

   if (organizationInstance.save(flush: true)) {
       render status: CREATED, text: 'Organization Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete Organization'
   }  

}
    
}
