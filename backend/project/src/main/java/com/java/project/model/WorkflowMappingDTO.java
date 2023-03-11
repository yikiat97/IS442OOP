package com.java.project.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class WorkflowMappingDTO {
    private List<String> forms;

    private String workflowName;

    // Getters and setters
    public List<String> getForms() {
        return forms;
    }

    public String getWorkflowName() {
        return workflowName;
    }

}
