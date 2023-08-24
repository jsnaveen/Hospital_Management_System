package com.hospital.managementsystem



import grails.test.mixin.*
import spock.lang.*

@TestFor(PrescriptionHistoryController)
@Mock(PrescriptionHistory)
class PrescriptionHistoryControllerSpec extends Specification {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void "Test the index action returns the correct model"() {

        when:"The index action is executed"
            controller.index()

        then:"The model is correct"
            !model.prescriptionHistoryInstanceList
            model.prescriptionHistoryInstanceCount == 0
    }

    void "Test the create action returns the correct model"() {
        when:"The create action is executed"
            controller.create()

        then:"The model is correctly created"
            model.prescriptionHistoryInstance!= null
    }

    void "Test the save action correctly persists an instance"() {

        when:"The save action is executed with an invalid instance"
            def prescriptionHistory = new PrescriptionHistory()
            prescriptionHistory.validate()
            controller.save(prescriptionHistory)

        then:"The create view is rendered again with the correct model"
            model.prescriptionHistoryInstance!= null
            view == 'create'

        when:"The save action is executed with a valid instance"
            response.reset()
            populateValidParams(params)
            prescriptionHistory = new PrescriptionHistory(params)

            controller.save(prescriptionHistory)

        then:"A redirect is issued to the show action"
            response.redirectedUrl == '/prescriptionHistory/show/1'
            controller.flash.message != null
            PrescriptionHistory.count() == 1
    }

    void "Test that the show action returns the correct model"() {
        when:"The show action is executed with a null domain"
            controller.show(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the show action"
            populateValidParams(params)
            def prescriptionHistory = new PrescriptionHistory(params)
            controller.show(prescriptionHistory)

        then:"A model is populated containing the domain instance"
            model.prescriptionHistoryInstance == prescriptionHistory
    }

    void "Test that the edit action returns the correct model"() {
        when:"The edit action is executed with a null domain"
            controller.edit(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the edit action"
            populateValidParams(params)
            def prescriptionHistory = new PrescriptionHistory(params)
            controller.edit(prescriptionHistory)

        then:"A model is populated containing the domain instance"
            model.prescriptionHistoryInstance == prescriptionHistory
    }

    void "Test the update action performs an update on a valid domain instance"() {
        when:"Update is called for a domain instance that doesn't exist"
            controller.update(null)

        then:"A 404 error is returned"
            response.redirectedUrl == '/prescriptionHistory/index'
            flash.message != null


        when:"An invalid domain instance is passed to the update action"
            response.reset()
            def prescriptionHistory = new PrescriptionHistory()
            prescriptionHistory.validate()
            controller.update(prescriptionHistory)

        then:"The edit view is rendered again with the invalid instance"
            view == 'edit'
            model.prescriptionHistoryInstance == prescriptionHistory

        when:"A valid domain instance is passed to the update action"
            response.reset()
            populateValidParams(params)
            prescriptionHistory = new PrescriptionHistory(params).save(flush: true)
            controller.update(prescriptionHistory)

        then:"A redirect is issues to the show action"
            response.redirectedUrl == "/prescriptionHistory/show/$prescriptionHistory.id"
            flash.message != null
    }

    void "Test that the delete action deletes an instance if it exists"() {
        when:"The delete action is called for a null instance"
            controller.delete(null)

        then:"A 404 is returned"
            response.redirectedUrl == '/prescriptionHistory/index'
            flash.message != null

        when:"A domain instance is created"
            response.reset()
            populateValidParams(params)
            def prescriptionHistory = new PrescriptionHistory(params).save(flush: true)

        then:"It exists"
            PrescriptionHistory.count() == 1

        when:"The domain instance is passed to the delete action"
            controller.delete(prescriptionHistory)

        then:"The instance is deleted"
            PrescriptionHistory.count() == 0
            response.redirectedUrl == '/prescriptionHistory/index'
            flash.message != null
    }
}
