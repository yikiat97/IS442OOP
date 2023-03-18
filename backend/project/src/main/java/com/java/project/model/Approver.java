package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Approver")
public class Approver extends User{

    private String username;

    public Approver(String password, String name, String email, String contactNumber, String role, String company) {
        super(password, name, email, contactNumber, role,company);
        this.username = role + "_" + email;
    }
}
