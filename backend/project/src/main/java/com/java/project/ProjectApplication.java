package com.java.project;

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
    public static void main(String[] args) {
      SpringApplication.run(ProjectApplication.class, args);
      
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        System.out.println("Data creation started...");
//        UserRepo.save(new User("yikiat", "yikiat", "yikiat", "yikiat@hotmail.com","Admin"));
//        UserRepo.save(new User("elmer", "elmer", "elmer", "elmer@hotmail.com","Vendor"));
        System.out.println("Data creation complete...");
      return String.format("Hello %s!", name);
    }
    
}


