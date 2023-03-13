package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
public class Admin extends User{

    public Admin(String password, String name, String email, String role, String company) {
        super(password, name, email, role, company);
    }
}