package com.java.project.controller;

import com.java.project.model.Company;
import com.java.project.model.User;
import com.java.project.repository.CompanyRepository;
import com.java.project.repository.UserRepository;
import com.java.project.exception.DataNotFoundException;
import com.java.project.exception.GlobalExceptionHandler;
import com.mongodb.internal.selector.ReadPreferenceServerSelector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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

    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;

    @GetMapping
    public ResponseEntity getCompanies(){
        List<Company> companyList = CompanyRepository.findAll();
        if(!companyList.isEmpty()){
            return ResponseEntity.ok(companyList);
        }else{
            throw new DataNotFoundException("Companies not found");
        }
    }

    @GetMapping("/quantumRegNum")
    public ResponseEntity getQuantumRegistrationNum(){
        List<User> userList = UserRepository.findByRole("Approver");
        if(!userList.isEmpty()){
            return ResponseEntity.ok(userList.get(0).getCompanyRegistrationNum());
        }else{
            throw new DataNotFoundException("Quantum registration number not found");
        }
    }

    @GetMapping("/registrationList")
    public ResponseEntity getRegistrationNumbers(){
        List<Company> companyList = CompanyRepository.findAll();
        if(companyList.isEmpty()){
            throw new DataNotFoundException("Registration numbers not found.");
        }else{
            List<String> registarionNumList = new ArrayList<>();
            for (Company company: companyList
                 ) {
                registarionNumList.add(company.getRegistrationNum());
            }
            return ResponseEntity.ok(registarionNumList);
        }
    }

    @GetMapping (value = "/getDetails")
    public ResponseEntity getCompanyDetails(@RequestParam String registrationNum){
        Optional<Company> company = CompanyRepository.findById(registrationNum);
        if(company.isEmpty()){
            throw new DataNotFoundException("Company does not exist");
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
                throw new DuplicateKeyException("Company already exists.");
            }
        }else{
            throw new IllegalArgumentException("Company name cannot be empty");
        }

    }

    @GetMapping(value = "/country")
    public ResponseEntity<?> getCompanyCountry(@RequestParam String registrationNumber){
        Optional<Company> company = CompanyRepository.findById(registrationNumber);
            if(company.isPresent()){
                Company databaseCompany = company.get();
                return ResponseEntity.ok(databaseCompany.getCountry());
            }
            else{
            throw new DataNotFoundException("Company does not exist");
            }
    }

    @PutMapping(value="/edit")
    public ResponseEntity editCompany(@RequestBody Company editCompany){
        Optional<Company> company = CompanyRepository.findById(editCompany.getRegistrationNum());
        if(company.isPresent()){
            Company saveCompany = CompanyRepository.save(editCompany);
            return ResponseEntity.ok(saveCompany);
        }else{
            throw new DataNotFoundException("Company does not exist");
        }
    }
}
