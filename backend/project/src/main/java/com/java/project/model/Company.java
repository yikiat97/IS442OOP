package com.java.project.model;

import java.util.List;

public class Company {
    private String name;
    private String country;
    private List<String> employeeUsernames;

    public Company(String name, String country, List<String> employeeUsernames) {
        this.name = name;
        this.employeeUsernames = employeeUsernames;
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

    public List<String> getEmployeeUsernames() {
        return employeeUsernames;
    }

    public void setEmployeeUsernames(List<String> employeeUsernames) {
        this.employeeUsernames = employeeUsernames;
    }

}
