package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class PrescriptionHistoryController {

    static allowedMethods = [indexApi: "GET", showApi: "GET", deleteApi: "DELETE", updateApi: "PUT"]

@Transactional
def indexApi() {
def prescriptionHistories = PrescriptionHistory.list()
        render prescriptionHistories as JSON
    }

@Transactional
def showApi(Long id) {
def prescriptionHistoryInstance = PrescriptionHistory.get(id)
        if (!prescriptionHistoryInstance) {
            render status: BAD_REQUEST
            return
        }
        render prescriptionHistoryInstance as JSON
    }

    
@Transactional
   def deleteApi(Long id) {
      def prescriptionHistoryInstance = PrescriptionHistory.get(id)
       if (!prescriptionHistoryInstance) {
        render status: BAD_REQUEST
        return
      }

   prescriptionHistoryInstance.status = 0
   if (prescriptionHistoryInstance.save(flush: true)) {
       render status: CREATED, text: 'PrescriptionHistory Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete PrescriptionHistory'
   }  

}


@Transactional
def updateApi(Long id) {
    def prescriptionHistoryInstance = PrescriptionHistory.get(id)
       
    if (!prescriptionHistoryInstance) {
        render status: BAD_REQUEST
            return
    }

    prescriptionHistoryInstance.properties = params

    if (prescriptionHistoryInstance.save(flush: true)) {
        render status: CREATED, text: 'PrescriptionHistory Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update PrescriptionHistory'
    }     
 }
}


