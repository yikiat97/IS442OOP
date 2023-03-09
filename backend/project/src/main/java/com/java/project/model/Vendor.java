package com.java.project.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("testingVendor")
public class Vendor {
    @Id
    private String id;
    private Integer VendorID;
    private String CompanyName;
    private List<String> Answers;
    private List<String> LockedSections;
    private List<String> Workflows;
    private List<String> Status;
    private List<String> Priority;

    public Vendor(String id, Integer VendorID, String CompanyName, List<String> Answers, List<String> LockedSections, List<String> Workflows, List<String> Status, List<String> Priority) {
        super();
        this.id = id;
        this.VendorID = VendorID;
        this.CompanyName = CompanyName;
        this.Answers = Answers;
        this.LockedSections = LockedSections;
        this.Workflows = Workflows;
        this.Status = Status;
        this.Priority = Priority;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getVendorID() {
        return VendorID;
    }

    public void setVendorID(Integer vendorID) {
        VendorID = vendorID;
    }
    public String getCompanyName() {
        return CompanyName;
    }

    public void setCompanyName(String companyName) {
        CompanyName = companyName;
    }

    public List<String> getAnswers() {
        return Answers;
    }

    public void setAnswers(List<String> answers) {
        Answers = answers;
    }

    public List<String> getLockedSections() {
        return LockedSections;
    }

    public void setLockedSections(List<String> lockedSections) {
        LockedSections = lockedSections;
    }

    public List<String> getWorkflows() {
        return Workflows;
    }

    public void setWorkflows(List<String> workflows) {
        Workflows = workflows;
    }

    public List<String> getStatus() {
        return Status;
    }

    public void setStatus(List<String> status) {
        Status = status;
    }

    public List<String> getPriority() {
        return Priority;
    }

    public void setPriority(List<String> priority) {
        Priority = priority;
    }

}
