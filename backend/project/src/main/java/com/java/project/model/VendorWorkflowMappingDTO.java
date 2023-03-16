package com.java.project.model;
import java.util.List;

public class VendorWorkflowMappingDTO {
    private List<String> forms;

    private String vendorWorkflowName;

    private String status;

    private String vendorID;

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

    public String getVendorID() {
        return vendorID;
    }

}
