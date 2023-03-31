package com.java.project.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Workflow")
public class Workflow {
    @Id
    private String id;
    private List<String> Forms;
    private String WorkflowName;
    private String Status;


    public Workflow(String id, List<String> Forms, String WorkflowName, String Status) {
        super();
        this.id = id;
        this.Forms = Forms;
        this.WorkflowName = WorkflowName;
        this.Status = Status;
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
}
