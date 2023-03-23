package com.java.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Company")
public class Company {

    @Id
    private String registrationNum;
    private String name;
    private String country;
    private String businessNature;
    private String gstRegistrationNumber;

    public Company(String registrationNum, String name, String country, String businessNature, String gstRegistrationNumber) {
        this.registrationNum = registrationNum;
        this.name = name;
        this.country = country;
        this.businessNature = businessNature;
        this.gstRegistrationNumber = gstRegistrationNumber;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegistrationNum() {
        return registrationNum;
    }

    public void setRegistrationNum(String registrationNum) {
        this.registrationNum = registrationNum;
    }

    public String getBusinessNature() {
        return businessNature;
    }

    public void setBusinessNature(String businessNature) {
        this.businessNature = businessNature;
    }

    public String getGstRegistrationNumber() {
        return gstRegistrationNumber;
    }

    public void setGstRegistrationNumber(String gstRegistrationNumber) {
        this.gstRegistrationNumber = gstRegistrationNumber;
    }

}
