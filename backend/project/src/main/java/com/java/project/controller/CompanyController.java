package com.java.project.controller;

import com.java.project.model.Company;
import com.java.project.model.User;
import com.java.project.repository.CompanyRepository;
import com.java.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    CompanyRepository CompanyRepository;

    @Autowired
    UserRepository UserRepository;

    @GetMapping
    public ResponseEntity getCompanies(){
        List<Company> companyList = CompanyRepository.findAll();
        return ResponseEntity.ok(companyList);
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addCompany(@RequestBody Company newCompany){
        if(CompanyRepository.findCompanyByName(newCompany.getName()) == null){
            Company company = CompanyRepository.save(newCompany);
            return ResponseEntity.ok(company);
        }else{
            return new ResponseEntity<>("Company already exists", HttpStatus.CONFLICT);
        }
    }

    @GetMapping(value = "/country")
    public ResponseEntity getCompanyCountry(@RequestParam String name){
        Company company = CompanyRepository.findCompanyByName(name);
        if(company != null){
            return ResponseEntity.ok(company.getCountry());
        }else{
            return new ResponseEntity<>("Company does not exist", HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping(value = "/getUsers")
    public ResponseEntity getCompanyUsers(@RequestParam String name){
        List<String> userEmails = CompanyRepository.findCompanyByName(name).getUserEmail();
        List<User> users = new ArrayList<>();
        for (String email : userEmails){
            users.add(UserRepository.findUserByUsername(email));
        }
        return ResponseEntity.ok(users);
    }
}
