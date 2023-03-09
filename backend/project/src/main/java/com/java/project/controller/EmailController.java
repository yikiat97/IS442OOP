package com.java.project.controller;

import com.java.project.model.Email;
import com.java.project.service.EmailSenderService;
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
                service.sendEmail(email.getToEmail(),email.getBody(),email.getSubject());
                return "Email sent successfully";
            }catch (MailException e){
                return "error";
            }

    }
}