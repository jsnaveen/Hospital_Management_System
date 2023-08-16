package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class AddressController {

static allowedMethods = [indexApi: "GET", showApi: "GET",createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
def indexApi() {
        def addresses = Address.list() 
        render addresses as JSON
    }
@Transactional
    def showApi(Long id) {
        def addressInstance = Address.get(id)
        if (!addressInstance) {
            render status: BAD_REQUEST
            return
        } 
            render addressInstance as JSON
        
    }
@Transactional
    def createApi() {
        def newaddress = new Address(params)
        newaddress.status = 1
        if (newaddress.save(flush: true)) {
            render status: CREATED, text: 'Address created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create Address'
        }
    }

@Transactional
    def updateApi(Long id) {
        def addressInstance = Address.get(id)
         if (!addressInstance) {
        render status: BAD_REQUEST
        return
    }

    addressInstance.properties = params

    if (addressInstance.save(flush: true)) {
        render status: CREATED, text: 'Address Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update Address'
    }     
    }

@Transactional
   def deleteApi(Long id) {
      def addressInstance = Address.get(id)
       if (!addressInstance) {
        render status: BAD_REQUEST
        return
      }

   addressInstance.status = 0
   addressInstance.postalCode = addressInstance.postalCode + "_0"

   if (addressInstance.save(flush: true)) {
       render status: CREATED, text: 'Address Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete Address'
   }  
 }
}