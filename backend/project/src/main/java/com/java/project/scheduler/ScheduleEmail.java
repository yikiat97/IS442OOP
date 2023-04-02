package com.java.project.scheduler;

import com.java.project.model.Email;
import com.java.project.model.VendorWorkflow;
import com.java.project.repository.EmailRepository;
import com.java.project.repository.VendorWorkflowRepository;
import com.java.project.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class ScheduleEmail {

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    EmailRepository EmailRepository;

    @Autowired
    VendorWorkflowRepository VendorWorkflowRepository;

    @Scheduled(cron = "0 0 12 * * *") // everyday at 12pm
    public void AutomatedOverdueEmails() {
        List<VendorWorkflow> vendorWorkflows = VendorWorkflowRepository.findAll();
        for (VendorWorkflow vendorWork : vendorWorkflows
        ) {
            if (vendorWork.getStatus().equals("Pending")) {
                DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                LocalDateTime now = LocalDateTime.now();
                String[] currTimeArr = dtf.format(now).split("/");
                String[] dueTimeArr = vendorWork.getDate().split("/");

                Integer currYear = Integer.parseInt(currTimeArr[2]);
                Integer dueYear = Integer.parseInt(dueTimeArr[2]);
                Integer currMonth = Integer.parseInt(currTimeArr[1]);
                Integer dueMonth = Integer.parseInt(dueTimeArr[1]);
                Integer currDay = Integer.parseInt(currTimeArr[0]);
                Integer dueDay = Integer.parseInt(dueTimeArr[0]);

                String body = "";

                if (currYear == dueYear && currMonth == dueMonth) {
                    if (currDay > dueDay && ((currDay - dueDay) % 3 == 0)) {
                        body = "Dear " + vendorWork.getName() + ", You have uncompleted/unsubmitted forms in " + vendorWork.getWorkflowName()
                                + " past the deadline. Please submit them ASAP. Thank you!";
                    } else if ((currDay == dueDay)) {
                        body = "Dear " + vendorWork.getName() + ", You have uncompleted/unsubmitted forms in " + vendorWork.getWorkflowName()
                                + " that are due today. Please submit them by today. Thank you!";
                    }
                } else if (currTimeArr[2].equals(dueTimeArr[2]) && (currMonth - 1 == dueMonth)) {
                    Integer dueMonthDays = 0;
                    if (dueMonth == 2) {
                        dueMonthDays = 28;
                    } else if (dueMonth == 1 || dueMonth == 3 || dueMonth == 5 || dueMonth == 7 || dueMonth == 8 || dueMonth == 10 || dueMonth == 12) {
                        dueMonthDays = 31;
                    } else {
                        dueMonthDays = 30;
                    }

                    Integer diffInDays = dueMonthDays - dueDay;
                    diffInDays = diffInDays + currDay;
                    if (diffInDays % 3 == 0) {
                        body = "Dear " + vendorWork.getName() + ", You have uncompleted/unsubmitted forms in " + vendorWork.getWorkflowName()
                                + " past the deadline. Please submit them ASAP. Thank you!";
                    }
                } else if (currYear - 1 == dueYear && currMonth == 1 && dueMonth == 12) {
                    Integer diffInDays = (31 - dueDay) + currDay;
                    if (diffInDays % 3 == 0) {
                        body = "Dear " + vendorWork.getName() + ", You have uncompleted/unsubmitted forms in " + vendorWork.getWorkflowName()
                                + " past the deadline. Please submit them ASAP. Thank you!";
                    }
                }

                if (!body.equals("")) {

                    Email email = new Email(vendorWork.getEmail(), body, "Quantum Overdue Workflow", "", "Overdue Workflow", vendorWork.getId(), dtf.format(now));
                    try {
                        emailSenderService.sendEmail(vendorWork.getEmail(), body, "Overdue Workflow", "");
                        email.setStatus("Success");
                        Email emailSent = EmailRepository.save(email);
                        System.out.println("success");
                    } catch (MailException e) {
                        email.setStatus("Error");
                        Email emailSent = EmailRepository.save(email);
                        System.out.println("error");
                    } catch (MessagingException e) {
                        email.setStatus("Error");
                        Email emailSent = EmailRepository.save(email);
                        System.out.println("error");
                    }
                }
            }

        }
    }
}
