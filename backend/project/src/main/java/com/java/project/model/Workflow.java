package com.java.project.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("testingWorkflow")
public class Workflow {
    @Id
    private String id;
    private Integer WorkflowID;
    private List<String> Forms;
    private String WorkflowName;
    
    public Workflow(String id, Integer WorkflowID, List<String> Forms, String WorkflowName) {
        super();
        this.id = id;
        this.WorkflowID = WorkflowID;
        this.Forms = Forms;
        this.WorkflowName = WorkflowName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getWorkflowID() {
        return WorkflowID;
    }

    public void setWorkflowID(Integer workflowID) {
        WorkflowID = workflowID;
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
}
