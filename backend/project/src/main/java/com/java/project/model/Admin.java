package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
public class Admin extends User{
    private String adminUsername;

    public Admin(String password, String name, String email, String role, String company) {
        super(password, name, email, role, company);
        this.adminUsername = role + "_" + email;
    }
    public String getAdminUsername() {
        return adminUsername;
    }

    public void setAdminUsername(String adminUsername) {
        this.adminUsername = adminUsername;
    }
}