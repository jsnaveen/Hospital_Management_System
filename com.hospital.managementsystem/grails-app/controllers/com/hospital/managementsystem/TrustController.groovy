package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class TrustController {
static scaffold = true


static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]

@Transactional
def indexApi() { 
  def trusts = Trust.list()
  render trusts as JSON
}

@Transactional
def showApi(Long id) {
   def trustInstance = Trust.get(id)
   if (!trustInstance) {
        render status: BAD_REQUEST
        return
   }
    render trustInstance as JSON
}

@Transactional
def createApi() {
    def newTrust = new Trust(params)
    println "The Name of the Trust is: ${newTrust.name}"

    newTrust.status = 1
    if (newTrust.save(flush: true)) {
        render status: CREATED, text: 'Trust created successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to create Trust '
    }

}

@Transactional
def updateApi(Long id) {
     def trustInstance = Trust.get(id)

    if (!trustInstance) {
        render status: BAD_REQUEST
        return
    }

    trustInstance.properties = params

    if (trustInstance.save(flush: true)) {
        render status: CREATED, text: 'Trust Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update Trust'
    }      
}
    

@Transactional
def deleteApi(Long id) {
   def trustInstance = Trust.get(id)
   if (!trustInstance) {
        render status: BAD_REQUEST
        return
   }

   trustInstance.status = 0
   trustInstance.code = trustInstance.code + "_0"

   if (trustInstance.save(flush: true)) {
       render status: CREATED, text: 'Trust Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete Trust'
   }  
 }
}