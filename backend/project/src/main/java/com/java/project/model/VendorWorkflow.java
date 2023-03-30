package com.java.project.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("VendorWorkflow")
public class VendorWorkflow {
    @Id
    private String id;
    private List<String> Forms;
    private String WorkflowName;
    private String Status;
    private String Email;
    private String Company;
    private String Date;
    private String Name;
    private List<String> QuestionID;

    public VendorWorkflow(String id, List<String> Forms, String WorkflowName, String Status, String Email,
            String Company, String Date, String Name, List<String> QuestionID) {
        super();
        this.id = id;
        this.Forms = Forms;
        this.WorkflowName = WorkflowName;
        this.Status = Status;
        this.Email = Email;
        this.Company = Company;
        this.Date = Date;
        this.Name = Name;
        this.QuestionID = QuestionID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getForms() {
        return Forms;
    }

    public void setForms(List<String> forms) {
        Forms = forms;
    }

    public String getWorkflowName() {
        return WorkflowName;
    }

    public void setWorkflowName(String workflowName) {
        WorkflowName = workflowName;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getCompany() {
        return Company;
    }

    public void setCompany(String company) {
        Company = company;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public List<String> getQuestionID() {
        return QuestionID;
    }

    public void setQuestionID(List<String> questionID) {
        QuestionID = questionID;
    }
}