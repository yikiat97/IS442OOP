package com.java.project.controller;

import com.java.project.model.User;
import com.java.project.repository.UserRepository;
import com.java.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/companies")
    public ResponseEntity getCompanies(){
        List<String> companyList = userService.getCompanies();
        return ResponseEntity.ok(companyList);
    }

    @GetMapping("/companyUsers")
    public ResponseEntity getCompanyUsers(@RequestParam String companyName){
        List<User> userList = userService.getUsersCompany(companyName);
        return ResponseEntity.ok(userList);
    }
}
