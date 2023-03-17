package com.java.project.model;
import java.util.List;

public class VendorWorkflowUpdateMappingDTO {
    private String id;
    
    private List<String> forms;
    
    private String vendorWorkflowName;

    private String status;
    
    // Getters and setters
    public String getId() {
        return id;
    }

    public List<String> getForms() {
        return forms;
    }

    public String getVendorWorkflowName() {
        return vendorWorkflowName;
    }

    public String getStatus() {
        return status;
    }

}
