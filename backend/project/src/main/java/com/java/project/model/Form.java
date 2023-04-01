package com.java.project.model;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Form")
public class Form {
    @Id
    private String formID;
    private String FormName;
    private List<Map<String, Object>> QuestionData;
    private String Status;



    public Form(String formID, String FormName, List<Map<String, Object>> QuestionData, String Status) {
        super();
        this.formID = formID;
        this.FormName = FormName;
        this.QuestionData = QuestionData;
        this.Status = Status;
    }


    public String getFormID() {
        return formID;
    }


    public void setFormID(String formID) {
        formID = formID;
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


    public String getStatus() {
        return Status;
    }


    public void setStatus(String status) {
        Status = status;
    }

}