package com.java.project.controller;

import com.java.project.model.Company;
import com.java.project.repository.CompanyRepository;
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
}
