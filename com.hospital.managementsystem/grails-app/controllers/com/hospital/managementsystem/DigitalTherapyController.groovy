package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class DigitalTherapyController {

    static scaffold = true
    static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]

    @Transactional
    def indexApi() {
        def digitalTherapies = DigitalTherapy.list()
        render digitalTherapies as JSON
    }

    @Transactional
    def showApi(Long id) {
        def digitalTherapyInstance = DigitalTherapy.get(id)
        if (!digitalTherapyInstance) {
            render status: BAD_REQUEST
            return
        }
        render digitalTherapyInstance as JSON
    }

    @Transactional
    def createApi() {
        def newDigitalTherapy = new DigitalTherapy(params)
      

        newDigitalTherapy.status = 1
        if (newDigitalTherapy.save(flush: true)) {
            render status: CREATED, text: 'DigitalTherapy created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create DigitalTherapy '
        }

    }

    @Transactional
    def updateApi(Long id) {
        def digitalTherapyInstance = DigitalTherapy.get(id)

        if (!digitalTherapyInstance) {
            render status: BAD_REQUEST
            return
        }

        digitalTherapyInstance.properties = params

        if (digitalTherapyInstance.save(flush: true)) {
            render status: CREATED, text: 'DigitalTherapy Updated successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to update DigitalTherapy'
        }
    }


    @Transactional
    def deleteApi(Long id) {
        def digitalTherapyInstance = DigitalTherapy.get(id)
        if (!digitalTherapyInstance) {
            render status: BAD_REQUEST
            return
        }

        digitalTherapyInstance.status = 0
        digitalTherapyInstance.code = digitalTherapyInstance.code + "_0"

        if (digitalTherapyInstance.save(flush: true)) {
            render status: CREATED, text: 'DigitalTherapy Deleted successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to delete DigitalTherapy'
        }
    }
}
