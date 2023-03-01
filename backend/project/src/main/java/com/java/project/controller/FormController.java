package com.java.project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.model.Form;
import com.java.project.repository.FormRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class FormController {
    @Autowired
    FormRepository FormRepository;

    // POST METHOD
    // @PostMapping("/insertForm")
    // public ResponseEntity<Form> createForm(@RequestBody Form Form) {
    // try {
    //     //String[] intArray = new String[]{ "FormSection2","FormSection2" }; 
    //     Form _Form = FormRepository.save(new Form(2, "Form2", null  , "Ratio", "Safety Pre-Check Form 2"));
    //     return new ResponseEntity<>(_Form, HttpStatus.CREATED);
    // } catch (Exception e) {
    //     return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
    // }
    // }
    
    
    @GetMapping("/insertForm")
    public ResponseEntity<Form> createForm(@RequestParam(required = false) Form Form) {
    try {
        //String[] intArray = new String[]{ "FormSection2","FormSection2" }; 
        Form _Form = FormRepository.save(new Form("Form3", 3, null  , "Ratio", "Safety Pre-Check Form 2"));
        return new ResponseEntity<>(_Form, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
    }
    }

    // FormRepository.findAll()
    @GetMapping("/allForm/{id}")
    public ResponseEntity<Form> getFormById(@PathVariable("id") String id) {
      Optional<Form> Form = FormRepository.findById(id);
    
      if (Form.isPresent()) {
        return new ResponseEntity<>(Form.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }


    }

  
    // @GetMapping("/tutorials/{id}")
    // public ResponseEntity<Tutorial> getTutorialById(@PathVariable("id") String id) {
      
    // }

