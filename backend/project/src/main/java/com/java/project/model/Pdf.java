package com.java.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Pdf")
public class Pdf {

    @Id
    private String id;
    private String formID;
    private String workflowID;
    private byte[] pdfByte;

    public Pdf(){}
    public Pdf(String formID, String workflowID, byte[] pdfByte) {
        this.formID = formID;
        this.workflowID = workflowID;
        this.pdfByte = pdfByte;
    }
    public Pdf(String id, String formID, String workflowID, byte[] pdfByte) {
        this.id = id;
        this.formID = formID;
        this.workflowID = workflowID;
        this.pdfByte = pdfByte;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFormID() {
        return formID;
    }

    public void setFormID(String formID) {
        this.formID = formID;
    }

    public String getWorkflowID() {
        return workflowID;
    }

    public void setWorkflowID(String workflowID) {
        workflowID = workflowID;
    }

    public byte[] getPdfByte() {
        return pdfByte;
    }

    public void setPdfByte(byte[] pdfByte) {
        this.pdfByte = pdfByte;
    }
}
