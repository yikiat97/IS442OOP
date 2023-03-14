package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Approver")
public class Approver extends User{

    private String username;

    public Approver(String password, String name, String email, String role, String company) {
        super(password, name, email, role,company);
        this.username = role + "_" + email;
    }
}
