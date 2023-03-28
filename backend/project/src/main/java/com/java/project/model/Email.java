package com.java.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Email")
public class Email {
    @Id
    private String id;
    private String toEmail;
    private String body;
    private String subject;
    private String attachment;
    private String status;
    private String vendorWorkflowId;

    public Email(String toEmail, String body, String subject, String attachment, String status, String vendorWorkflowId) {
        this.toEmail = toEmail;
        this.body = body;
        this.subject = subject;
        this.attachment = attachment;
        this.status = status;
        this.vendorWorkflowId = vendorWorkflowId;
    }

    public Email(String toEmail, String body, String subject, String attachment) {
        this.toEmail = toEmail;
        this.body = body;
        this.subject = subject;
        this.attachment = attachment;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getVendorWorkflowId() {
        return vendorWorkflowId;
    }

    public void setVendorWorkflowId(String vendorWorkflowId) {
        this.vendorWorkflowId = vendorWorkflowId;
    }
    public String getToEmail() {
        return toEmail;
    }

    public void setToEmail(String toEmail) {
        this.toEmail = toEmail;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

}
