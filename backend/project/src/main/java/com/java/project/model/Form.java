package com.java.project.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Form")
public class Form {
    @Id
    private String id;
    private Integer FormID;
    private List<String> FormSection;
    private String FormType;
    private String FormName;

    public Form(String id, Integer FormID, List<String> FormSection, String FormType, String FormName) {
        super();
        this.id = id;
        this.FormID = FormID;
        this.FormSection = FormSection;
        this.FormType = FormType;
        this.FormName = FormName;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getFormName() {
        return FormName;
    }
    public void setFormName(String formName) {
        FormName = formName;
    }
    public Integer getFormID() {
        return FormID;
    }
    public void setFormID(Integer formID) {
        FormID = formID;
    }
    public List<String> getFormSection() {
        return FormSection;
    }
    public void setFormSection(List<String> formSection) {
        FormSection = formSection;
    }
    public String getFormType() {
        return FormType;
    }
    public void setFormType(String formType) {
        FormType = formType;
    }
}
