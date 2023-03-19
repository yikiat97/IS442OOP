package com.java.project.model;
import java.util.List;

public class VendorWorkflowMappingDTO {
    private List<String> forms;

    private String vendorWorkflowName;

    private String status;
    
    private String email;
    
    private String company;
    
    private String date;
    
    private String name;

    // Getters and settersw
    public List<String> getForms() {
        return forms;
    }

    public String getVendorWorkflowName() {
        return vendorWorkflowName;
    }

    public String getStatus() {
        return status;
    }

    public String getEmail() {
        return email;
    }

    public String getCompany() {
        return company;
    }

    public String getDate() {
        return date;
    }

    public String getName() {
        return name;
    }

}
