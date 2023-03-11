package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
public class Admin extends User{
    private int employeeID;

    public int getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

    public Admin(String username, String password, String name, String email, String role, int employeeID) {
        super(username, password, name, email, role);
        this.employeeID = employeeID;
    }
}