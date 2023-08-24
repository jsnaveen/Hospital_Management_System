package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class HospitalTherapyController {

    static scaffold = true
    static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]

    @Transactional
    def indexApi() {
        def hospitalTherapies = HospitalTherapy.list()
        render hospitalTherapies as JSON
    }

    @Transactional
    def showApi(Long id) {
        def hospitalTherapyInstance = HospitalTherapy.get(id)
        if (!hospitalTherapyInstance) {
            render status: BAD_REQUEST
            return
        }
        render hospitalTherapyInstance as JSON
    }

    @Transactional
    def createApi() {
        def newHospitalTherapy = new HospitalTherapy(params)

        newHospitalTherapy.status = 1
        if (newHospitalTherapy.save(flush: true)) {
            render status: CREATED, text: 'HospitalTherapy created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create HospitalTherapy '
        }

    }

    @Transactional
    def updateApi(Long id) {
        def hospitalTherapyInstance = HospitalTherapy.get(id)

        if (!hospitalTherapyInstance) {
            render status: BAD_REQUEST
            return
        }

        hospitalTherapyInstance.properties = params

        if (hospitalTherapyInstance.save(flush: true)) {
            render status: CREATED, text: 'HospitalTherapy Updated successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to update HospitalTherapy'
        }
    }


    @Transactional
    def deleteApi(Long id) {
        def hospitalTherapyInstance = hospitalTherapy.get(id)
        if (!hospitalTherapyInstance) {
            render status: BAD_REQUEST
            return
        }

        hospitalTherapyInstance.status = 0
        hospitalTherapyInstance.code = hospitalTherapyInstance.code + "_0"

        if (hospitalTherapyInstance.save(flush: true)) {
            render status: CREATED, text: 'HospitalTherapy Deleted successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to delete HospitalTherapy'
        }
    }
}
