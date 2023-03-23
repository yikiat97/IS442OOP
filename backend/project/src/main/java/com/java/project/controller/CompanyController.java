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
import java.util.NoSuchElementException;
import java.util.Optional;

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

    @GetMapping("/checkCompanyExists")
    public ResponseEntity<?> checkIfCompanyExistsBeforeCreation (@RequestParam String name){
        Optional<Company> company = CompanyRepository.findById(name);
        if(company == null){
            return ResponseEntity.ok("Company does not exist");
        }else{
            return new ResponseEntity<>("Company already exists", HttpStatus.CONFLICT);
        }
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addCompany(@RequestBody Company newCompany){

        if(newCompany.getName() != null || newCompany.getName() != ""){
            Optional<Company> company = CompanyRepository.findById(newCompany.getName());
            if(!company.isPresent()){
                Company savedCompany = CompanyRepository.save(newCompany);
                return ResponseEntity.ok(savedCompany);
            }else{
                return new ResponseEntity<>("Company already exists", HttpStatus.CONFLICT);
            }
        }else{
            return new ResponseEntity<>("Company name cannot be empty", HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping(value = "/country")
    public ResponseEntity<?> getCompanyCountry(@RequestParam String name){
        Optional<Company> company = CompanyRepository.findById(name);
        try{
            Company databaseCompany = company.get();
            return ResponseEntity.ok(databaseCompany.getCountry());
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Company does not exist", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/getUsers")
    public ResponseEntity getCompanyUsers(@RequestParam String name){
        Optional<Company> company = CompanyRepository.findById(name);
        try{
            Company databaseCompany = company.get();
            List<User> users = new ArrayList<>();
            for (String email : databaseCompany.getUserEmail()){
                users.add(UserRepository.findUserByUsername(email));
            }
            return ResponseEntity.ok(users);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Company does not exist", HttpStatus.UNAUTHORIZED);
        }

    }
}
