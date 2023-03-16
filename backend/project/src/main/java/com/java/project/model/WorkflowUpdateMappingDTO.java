package com.java.project.model;
import java.util.List;

public class WorkflowUpdateMappingDTO {
    private String id;
    
    private List<String> forms;
    
    private String workflowName;
    
    // Getters and setters
    public String getId() {
        return id;
    }

    public List<String> getForms() {
        return forms;
    }

    public String getWorkflowName() {
        return workflowName;
    }

}
