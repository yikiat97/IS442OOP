package com.java.project.model;

public class Email {
    private String toEmail;

    private String body;
    private String subject;

    public Email(String toEmail, String body, String subject) {
        this.toEmail = toEmail;
        this.body = body;
        this.subject = subject;
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

}
