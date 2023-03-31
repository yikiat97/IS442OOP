package com.java.project.controller;

import com.java.project.exception.DataNotFoundException;
import com.java.project.model.Email;
import com.java.project.repository.EmailRepository;
import com.java.project.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import com.java.project.exception.GlobalExceptionHandler;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailSenderService service;

    @Autowired
    private EmailRepository EmailRepository;

    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;

    @GetMapping
    public ResponseEntity getEmails() {
        List<Email> emailList = EmailRepository.findAll();
        if (emailList.isEmpty()) {
            throw new DataNotFoundException("No emails found");
        } else {
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }
    }

    @GetMapping("/error")
    public ResponseEntity getErrorEmails() {
        List<Email> emailList = EmailRepository.findEmailByStatus("Error");
        if (emailList.isEmpty()) {
            throw new DataNotFoundException("No emails found");
        } else {
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }
    }

    @GetMapping("/accountCreation")
    public ResponseEntity getAccountCreationEmails() {
        List<Email> emailList = EmailRepository.findEmailByType("Account Creation");
        if (emailList.isEmpty()) {
            throw new DataNotFoundException("No account creation emails found");
        } else {
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }
    }

    @GetMapping("/overdueWorkflow")
    public ResponseEntity getOverdueWorkflowEmails() {
        List<Email> emailList = EmailRepository.findAll();
        emailList.sort(Comparator.comparing(Email::getDate).reversed());
        return ResponseEntity.ok(emailList);
    }

    @GetMapping("/workflow")
    public ResponseEntity getWorkflowEmails(@RequestParam String workflowId) {
        List<Email> emailList = EmailRepository.findEmailByRelatedId(workflowId);
        if (emailList.isEmpty()) {
            throw new DataNotFoundException("Workflow emails not found");
        } else {
            emailList.sort(Comparator.comparing(Email::getDate).reversed());
            return ResponseEntity.ok(emailList);
        }
    }

    @PostMapping(value = "/sendEmail", consumes = "application/json", produces = "application/json")
    public ResponseEntity sendEmail(@RequestBody Email email) {
        try {
            service.sendEmail(email.getToEmail(), email.getBody(), email.getSubject(), email.getAttachment());
            email.setStatus("Success");
            Email emailSent = EmailRepository.save(email);
            return ResponseEntity.ok(emailSent);
        } catch (MailException e) {
            email.setStatus("Error");
            Email emailSent = EmailRepository.save(email);
            return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
        } catch (MessagingException e) {
            email.setStatus("Error");
            Email emailSent = EmailRepository.save(email);
            return new ResponseEntity<>("Messaging Exception", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/forgetPasswordEmail", consumes = "application/json", produces = "application/json")
    public String ForgetPasswordEmail(@RequestParam String email) {
        try {
            String emailBody = "";
            String subject = "";
            service.sendEmail(email, emailBody, subject, null);
            return "Email sent successfully";
        } catch (MailException e) {
            return "error";
        } catch (MessagingException e) {
            return "error";
        }
    }

    @GetMapping(value = "/resend")
    public ResponseEntity resendEmail(@RequestParam String id) {
        Optional<Email> email = EmailRepository.findById(id);
        if (email.isPresent()) {
            Email emailInfo = email.get();
            // String toEmail, String body, String subject, String attachment, String type,
            // String relatedId, String date
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDateTime now = LocalDateTime.now();
            String date = dtf.format(now);
            Email newEmail = new Email(emailInfo.getToEmail(), emailInfo.getBody(), emailInfo.getSubject(),
                    emailInfo.getAttachment(), emailInfo.getType(), emailInfo.getRelatedId(), date);
            try {
                service.sendEmail(emailInfo.getToEmail(), emailInfo.getBody(), emailInfo.getSubject(),
                        emailInfo.getAttachment());
                newEmail.setStatus("Success");
                EmailRepository.save(newEmail);
                return ResponseEntity.ok("Success");
            } catch (MailException e) {
                newEmail.setStatus("Error");
                EmailRepository.save(newEmail);
                return new ResponseEntity<>("Mail Exception Error", HttpStatus.UNAUTHORIZED);
            } catch (MessagingException e) {
                newEmail.setStatus("Error");
                EmailRepository.save(newEmail);
                return new ResponseEntity<>("Messaging Exception", HttpStatus.UNAUTHORIZED);
            }
        }
        throw new DataNotFoundException("No such email");
    }
}
