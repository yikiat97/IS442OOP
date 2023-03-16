package com.java.project.controller;

import com.java.project.model.Email;
import com.java.project.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/email")
public class EmailController {

        @Autowired
        private EmailSenderService service;

        @PostMapping(value = "/sendEmail", consumes = "application/json", produces = "application/json")
        public String sendEmail(@RequestBody Email email) {
            try{
                service.sendEmail(email.getToEmail(),email.getBody(),email.getSubject(),email.getAttachment());
                return "Email sent successfully";
            }catch (MailException e){
                return "error";
            }catch(MessagingException e){
                return "error";
            }
    }

        @PostMapping(value = "/forgetPasswordEmail", consumes = "application/json", produces = "application/json")
        public String ForgetPasswordEmail(@RequestParam String email) {
            try{
                String emailBody = "";
                String subject = "";
                service.sendEmail(email,emailBody,subject,null);
                return "Email sent successfully";
            }catch (MailException e){
                return "error";
            }catch(MessagingException e){
                return "error";
            }
        }
}
