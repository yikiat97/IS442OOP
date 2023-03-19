package com.java.project.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Vendor")
public class Vendor extends User{
    private List<String> Answers;
    private List<String> LockedSections;
    private List<String> Workflows;
    private List<String> Status;
    private List<String> Priority;

    public Vendor(){
        super();
    }

    public Vendor(String password, String name, String email, String contactNumber, String role, String company) {
        super(password, name, email, contactNumber, role, company);
    }

    public Vendor(String password, String name, String email, String contactNumber, String role, String company, List<String> Answers, List<String> LockedSections, List<String> Workflows, List<String> Status, List<String> Priority) {
        super(password, name, email, contactNumber, role, company);
        this.Answers = Answers;
        this.LockedSections = LockedSections;
        this.Workflows = Workflows;
        this.Status = Status;
        this.Priority = Priority;
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
