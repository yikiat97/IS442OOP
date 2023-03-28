package com.java.project.controller;

import com.java.project.model.Email;
import com.java.project.repository.EmailRepository;
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

        @Autowired
        private EmailRepository EmailRepository;

        @PostMapping(value = "/sendEmail", consumes = "application/json", produces = "application/json")
        public String sendEmail(@RequestBody Email email) {
            try{
                service.sendEmail(email.getToEmail(),email.getBody(),email.getSubject(),email.getAttachment());
                email.setStatus("success");
                Email emailSent = EmailRepository.save(email);
                return "Email sent successfully";
            }catch (MailException e){
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return "error";
            }catch(MessagingException e){
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
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
