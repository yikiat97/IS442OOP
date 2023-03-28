package com.java.project;

import com.java.project.model.*;
import com.java.project.repository.CompanyRepository;
import com.java.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.repository.UserRepository;

import java.util.Arrays;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@RestController
@EnableMongoRepositories
@EnableScheduling
public class ProjectApplication  {
    @Autowired
    UserRepository UserRepo;

    @Autowired
    CompanyRepository CompanyRepo;

    @Autowired
    UserService userService;
    public static void main(String[] args) {
      SpringApplication.run(ProjectApplication.class, args);
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }

    @GetMapping("/createTestCompany")
    public String createCompany() {
        CompanyRepo.save(new Company("12345678","Quantum", "Singapore", "test", "12345678"));
        CompanyRepo.save(new Company("22345678","Company1", "Singapore", "test", "12345678"));
        CompanyRepo.save(new Company("32345678","Company2", "China", "test", "12345678"));
        CompanyRepo.save(new Company("42345678","Company3", "Australia", "test", "12345678"));
        CompanyRepo.save(new Company("52345678","Company4", "Singapore", "test", "12345678"));
        CompanyRepo.save(new Company("62345678","Company5", "Singapore", "test", "12345678"));
        CompanyRepo.save(new Company("72345678","Company6", "Australia", "test", "12345678"));
        CompanyRepo.save(new Company("82345678","Company7", "Australia", "test", "12345678"));
        return "Data creation company completed";
    }

    @GetMapping("/createTestUser")
    public String createUser() {
        UserRepo.save(new Approver(userService.encryptPassword("quantum1"), "Quantum_Approver1", "diyanahjamal@gmail.com","123456","Approver", "12345678"));
        UserRepo.save(new Admin(userService.encryptPassword("quantum1"), "Quantum_Admin1", "oopis442team7@outlook.com","123456","Admin", "12345678"));
        UserRepo.save(new Admin(userService.encryptPassword("quantum2"), "Quantum_Admin2", "diyanahj.2020@smu.edu.sg","123456","Admin", "12345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "yikiat", "yikiat.lim.2020@scis.smu.edu.sg","123456","Vendor", "22345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "elmer", "elmer.yeo.2020@scis.smu.edu.sg","","Vendor", "32345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "diyanah", "diyanahj.2020@scis.smu.edu.sg","","Vendor", "42345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "chong hui", "chkwan.2020@scis.smu.edu.sg","","Vendor", "532345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "syafinaz", "syafinazss.2020@scis.smu.edu.sg","","Vendor", "62345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "jun wei", "jwleong.2020@scis.smu.edu.sg","","Vendor", "72345678"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "hui lin", "huilin.tay.2020@scis.smu.edu.sg","","Vendor", "82345678"));
        return "Data creation user completed";
    }
    
}


