package com.java.project.model;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Form")
public class Form {
    @Id
    private String formID;
    private String WorkflowID;
    private String FormType;
    private String FormName;
    private List<Map<String, Object>> QuestionData;


    public Form(String formID, String WorkflowID,  String FormType, String FormName, List<Map<String, Object>> QuestionData) {
        super();
        this.formID = formID;
        this.WorkflowID = WorkflowID;
        this.FormType = FormType;
        this.FormName = FormName;
        this.QuestionData = QuestionData;
    }


    public String getFormID() {
        return formID;
    }


    public void setFormID(String formID) {
        formID = formID;
    }


    public String getWorkflowID() {
        return WorkflowID;
    }


    public void setWorkflowID(String workflowID) {
        WorkflowID = workflowID;
    }


    public String getFormType() {
        return FormType;
    }


    public void setFormType(String formType) {
        FormType = formType;
    }


    public String getFormName() {
        return FormName;
    }


    public void setFormName(String formName) {
        FormName = formName;
    }


    public List<Map<String, Object>> getQuestionData() {
        return QuestionData;
    }


    public void setQuestionData(List<Map<String, Object>> questionData) {
        QuestionData = questionData;
    }

}