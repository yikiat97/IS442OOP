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
        CompanyRepo.save(new Company("Quantum", "Singapore", null));
        CompanyRepo.save(new Company("Company1", "Singapore", null));
        CompanyRepo.save(new Company("Company2", "China", null));
        CompanyRepo.save(new Company("Company3", "Australia", null));
        CompanyRepo.save(new Company("Company4", "Singapore", null));
        CompanyRepo.save(new Company("Company5", "Singapore", null));
        CompanyRepo.save(new Company("Company6", "Australia", null));
        return "Data creation company completed";
    }

    @GetMapping("/createTestUser")
    public String createUser() {
        UserRepo.save(new Approver(userService.encryptPassword("quantum1"), "Quantum_Approver1", "Quantum_Approver@hotmail.com","Approver", "Quantum"));
        UserRepo.save(new Admin(userService.encryptPassword("quantum1"), "Quantum_Admin1", "Quantum_Admin1@hotmail.com","Admin", "Quantum"));
        UserRepo.save(new Admin(userService.encryptPassword("quantum2"), "Quantum_Admin2", "Quantum_Admin2@hotmail.com","Admin", "Quantum"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "yikiat", "yikiat@hotmail.com","Vendor", "Company1"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "elmer", "elmer@hotmail.com","Vendor", "Company2"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "diyanah", "diyanahjamal@gmail.com","Vendor", "Company3"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "ch", "ch@gmail.com","Vendor", "Company4"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "hl", "hl@gmail.com","Vendor", "Company4"));
        UserRepo.save(new Vendor(userService.encryptPassword("password"), "syafinaz", "syafinaz@gmail.com","Vendor", "Company5"));
        return "Data creation user completed";
    }
    
}


