package com.java.project.scheduler;

import com.java.project.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduleEmail {

    @Autowired
    private EmailSenderService emailSenderService;

    @Scheduled(cron = "0 0 12 * * *") // everyday at 12pm
    public void reportCurrentTime() {
        try{
            emailSenderService.sendEmail("diyanahjamal@gmail.com", "test", "test", "");
            System.out.println("success");
        }catch (MailException e){
            System.out.println("error");
        }catch(MessagingException e){
            System.out.println("error");
        }
    }
}
