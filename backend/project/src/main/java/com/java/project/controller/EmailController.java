package com.java.project.controller;

import com.java.project.model.Email;
import com.java.project.repository.EmailRepository;
import com.java.project.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/email")
public class EmailController {

        @Autowired
        private EmailSenderService service;

        @Autowired
        private EmailRepository EmailRepository;

        @GetMapping
        public ResponseEntity getEmails(){
            List<Email> emailList = EmailRepository.findAll();
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }

        @GetMapping("/accountCreation")
        public ResponseEntity getAccountCreationEmails(){
            List<Email> emailList = EmailRepository.findEmailByType("Account Creation");
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }

        @GetMapping("/overdueWorkflow")
        public ResponseEntity getOverdueWorkflowEmails(){
            List<Email> emailList = EmailRepository.findAll();
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }

        @GetMapping("/workflow")
        public ResponseEntity getWorkflowEmails(@RequestParam String workflowId){
            List<Email> emailList = EmailRepository.findEmailByRelatedId(workflowId);
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }

        @PostMapping(value = "/sendEmail", consumes = "application/json", produces = "application/json")
        public ResponseEntity sendEmail(@RequestBody Email email) {
            try{
                service.sendEmail(email.getToEmail(),email.getBody(),email.getSubject(),email.getAttachment());
                email.setStatus("Success");
                Email emailSent = EmailRepository.save(email);
                return ResponseEntity.ok(emailSent);
            }catch (MailException e){
                email.setStatus("Error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e){
                email.setStatus("Error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Messaging Exception", HttpStatus.UNAUTHORIZED);
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
