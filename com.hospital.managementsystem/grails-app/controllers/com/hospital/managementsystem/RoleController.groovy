package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class RoleController {

static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
def indexApi() {
        def roles = Role.list() 
        render roles as JSON
    }
@Transactional
    def showApi(Long id) {
        def roleInstance = Role.get(id)
        if (!roleInstance) {
           render status: BAD_REQUEST
           return
        } 
        render roleInstance as JSON 
    }
@Transactional
    def createApi() {
        def newrole = new Role(params)
        newrole.status = 1
        if (newrole.save(flush: true)) {
            render status: CREATED, text: 'Role created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create Role'
        }
    }

@Transactional
    def updateApi(Long id) {
        def roleInstance = Role.get(id)
         if (!roleInstance) {
        render status: BAD_REQUEST
        return
    }

    roleInstance.properties = params

    if (roleInstance.save(flush: true)) {
        render status: CREATED, text: 'Role Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update Role'
    }     
    }

@Transactional
   def deleteApi(Long id) {
      def roleInstance = Role.get(id)
       if (!roleInstance) {
        render status: BAD_REQUEST
        return
      }

   roleInstance.status = 0
   roleInstance.code = roleInstance.code + "_0"

   if (roleInstance.save(flush: true)) {
       render status: CREATED, text: 'Role Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete Role'
   }  
}
}