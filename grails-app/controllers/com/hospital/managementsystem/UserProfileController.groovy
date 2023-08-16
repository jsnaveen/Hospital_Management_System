package com.hospital.managementsystem


import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional


@Transactional(readOnly = true)
class UserProfileController {

static allowedMethods = [indexApi: "GET", showApi: "GET",createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]   

@Transactional
def indexApi() {
        def userProfiles = UserProfile.list() 
        render status: OK, contentType: 'application/json', text: userProfiles as JSON
    }


@Transactional
def showApi(Long id) {
def userProfileInstance = UserProfile.get(id)
    if (!userProfileInstance) {
        render status: BAD_REQUEST
        return
        } 
        render userProfile as JSON
    }


@Transactional
def createApi() {
def newUserProfile = new UserProfile(params)
    newUserProfile.status = 1
     if (newUserProfile.save(flush: true)) {
         render status: CREATED, text: 'UserProfile created successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to create UserProfile: ${newUserProfile.errors}'
        }
    }

@Transactional
def updateApi(Long id) {
def userProfileInstance = UserProfile.get(id)
    if (!userProfileInstance) {
        render status: BAD_REQUEST
        return
    }

    userProfileInstance.properties = params

    if (userProfileInstance.save(flush: true)) {
        render status: CREATED, text: 'UserProfile Updated successfully'
    } else {
        render status: BAD_REQUEST, text: 'Failed to update UserProfile'
        }     
    }

@Transactional
def deleteApi(Long id) {
def userProfileInstance = UserProfile.get(id)
    if (!userProfileInstance) {
        render status: BAD_REQUEST
        return
    }

   userProfileInstance.status = 0
   userProfileInstance.uuid = userProfileInstance.uuid + "_0"

   if (userProfileInstance.save(flush: true)) {
       render status: CREATED, text: 'UserProfile Deleted successfully'
    } else {
       render status: BAD_REQUEST, text: 'Failed to delete UserProfile'
   }  
 }
}