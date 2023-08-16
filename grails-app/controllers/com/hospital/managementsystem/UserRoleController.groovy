package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserRoleController {

static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
def indexApi() {
        def userRoles = UserRole.list() 
        render userRoles as JSON
    }
@Transactional
    def showApi(Long id) {
        def userRoleInstance = UserRole.get(id)
        if (!userRoleInstance) {
             render status: BAD_REQUEST
             return
        } 
          render userRoleInstance as JSON
    }
@Transactional
    def createApi() {
        def newuserRole = new UserRole(params)
        newuserRole.status = 1
        if (newuserRole.save(flush: true)) {
            render status: CREATED, text: 'UserRole created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create UserRole'
        }
    }

@Transactional
    def updateApi(Long id) {
        def userRoleInstance = UserRole.get(id)
         if (!userRoleInstance) {
        render status: BAD_REQUEST
        return
    }

    userRoleInstance.properties = params

    if (userRoleInstance.save(flush: true)) {
        render status: CREATED, text: 'UserRole Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update UserRole'
    }     
    }

@Transactional
   def deleteApi(Long id) {
      def userRoleInstance = UserRole.get(id)
       if (!userRoleInstance) {
        render status: BAD_REQUEST
        return
      }

   userRoleInstance.status = 0
   //userRoleInstance.status = userRoleInstance.status + "0"

   if (userRoleInstance.save(flush: true)) {
       render status: CREATED, text: 'UserRole Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete UserRole'
   }  
}
}
