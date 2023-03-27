package com.java.project.controller;

import com.java.project.model.Company;
import com.java.project.model.User;
import com.java.project.repository.CompanyRepository;
import com.java.project.repository.UserRepository;
import com.mongodb.internal.selector.ReadPreferenceServerSelector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.*;

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

    @GetMapping (value = "/getDetails")
    public ResponseEntity getCompanyDetails(@RequestParam String registrationNum){
        Optional<Company> company = CompanyRepository.findById(registrationNum);
        if(company.isEmpty()){
            return new ResponseEntity<>("Company does not exist", HttpStatus.UNAUTHORIZED);
        }else{
            return ResponseEntity.ok(company);
        }
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addCompany(@RequestBody Company newCompany){

        if(newCompany.getRegistrationNum() != null || newCompany.getRegistrationNum() != ""){
            Optional<Company> company = CompanyRepository.findById(newCompany.getRegistrationNum());
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
    public ResponseEntity<?> getCompanyCountry(@RequestParam String registrationNumber){
        Optional<Company> company = CompanyRepository.findById(registrationNumber);
        try{
            Company databaseCompany = company.get();
            return ResponseEntity.ok(databaseCompany.getCountry());
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Company does not exist", HttpStatus.UNAUTHORIZED);
        }
    }
}
