package com.hospital.managementsystem

class Product {

    String code
    String diseaseName
    Integer status


    static hasMany = [digitalTherapies: DigitalTherapy , hospitalTherapies: HospitalTherapy]

    static constraints = {
        code unique: true
    }
}
