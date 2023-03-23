package com.java.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Company")
public class Company {
    @Id
    private String name;
    private String country;
    private List<String> userUserName;

    public Company(String name, String country, List<String> userUserName) {
        this.name = name;
        this.country = country;
        this.userUserName = userUserName;
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
        return userUserName;
    }

    public void setUserEmail(List<String> userUserName) {
        this.userUserName = userUserName;
    }

    public List<String> addUser(String email) {
        if(this.userUserName == null || this.userUserName.isEmpty()){
            this.userUserName = List.of(email);
        }else{
            this.userUserName.add(email);
        }
        return userUserName;
    }

}
