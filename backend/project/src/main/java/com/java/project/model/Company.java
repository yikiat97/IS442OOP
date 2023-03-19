package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Company")
public class Company {
    private String name;
    private String country;
    private List<String> userEmail;

    public Company(String name, String country, List<String> userEmail) {
        this.name = name;
        this.country = country;
        this.userEmail = userEmail;
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

    public List<String> getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(List<String> userEmail) {
        this.userEmail = userEmail;
    }

    public List<String> addUser(String email) {
        if(this.userEmail == null || this.userEmail.isEmpty()){
            this.userEmail = List.of(email);
        }else{
            this.userEmail.add(email);
        }
        return userEmail;
    }

}
