 package com.hospital.managementsystem

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpStatus
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ProductController {
    static scaffold = true
    static allowedMethods = [indexApi: "GET", showApi: "GET", createApi: "POST", updateApi: "PUT", deleteApi: "DELETE"]

    @Transactional
    def indexApi() {
        def products = Product.list()
        render products as JSON
    }

    @Transactional
    def showApi(Long id) {
        def productInstance = Product.get(id)
        if (!productInstance) {
            render status: BAD_REQUEST
            return
        }
        render productInstance as JSON
    }

    @Transactional
    def createApi() {
        def newProduct = new Product(params)

        newProduct.status = 1
        if (newProduct.save(flush: true)) {
            render status: CREATED, text: 'Product created successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to create Product '
        }

    }

    @Transactional
    def updateApi(Long id) {
        def productInstance = Product.get(id)

        if (!productInstance) {
            render status: BAD_REQUEST
            return
        }

        productInstance.properties = params

        if (productInstance.save(flush: true)) {
            render status: CREATED, text: 'Product Updated successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to update Product'
        }
    }


    @Transactional
    def deleteApi(Long id) {
        def productInstance = Product.get(id)
        if (!productInstance) {
            render status: BAD_REQUEST
            return
        }

        productInstance.status = 0
        productInstance.code = productInstance.code + "_0"

        if (productInstance.save(flush: true)) {
            render status: CREATED, text: 'Product Deleted successfully'
        } else {
            render status: BAD_REQUEST, text: 'Failed to delete Product'
        }
    }
}
