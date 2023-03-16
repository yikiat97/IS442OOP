package com.java.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.model.Form;
import com.java.project.repository.FormRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class FormController {
    @Autowired
    FormRepository FormRepository;

    // Insert new question
    @PostMapping("Form/insertForm")
    public ResponseEntity<Form> createQuestion(@RequestBody Form FormData) {

      FormRepository.save(FormData);
      //System.out.println(FormData.getQuestionID());
      System.out.println("========= INSERT DATA SUCCESSFUL ===========");
        return new ResponseEntity<>(FormData, HttpStatus.CREATED);
      }

     //================================== Json Structure for Below ===================================
     //http://localhost:8080/Form/insertForm    
     // {
      //   "WorkflowID":"123444kko",
      //   "FormType":"A",
      //   "FormName":"Safety Pre-Check Form 2",
      //   "QuestionData": [
      //     {
      //       "type": "header",
      //       "subtype": "h2",
      //       "label": "FORM NAME 1",
      //       "className": "classname",
      //       "access": false,
      //       "role": "Test1"
      //     },
      //     {
      //       "type": "paragraph",
      //       "subtype": "p",
      //       "label": "Psmthdjiadjoiadwqaragraph",
      //       "className": "classname",
      //       "access": true,
      //       "role": "Test"
      //     }
      //   ]
      //   }

// Get All Form
    @GetMapping("getForm/All")
    public List<Form> getAllQuestion() {
            return FormRepository.findAll();
        }
// http://localhost:8080/getForm/640b618edb086d54e974b3b4//


// Get Form by ID
    @GetMapping("getForm/{id}")
    public ResponseEntity<?> getFormById(@PathVariable("id") String id) {
        Optional<Form> Form = FormRepository.findById(id);
        if (Form.isPresent()) {
          System.out.println("========= GET DATA SUCCESSFUL ===========");
            return ResponseEntity.ok(Form.get());
            
        } else {
          System.out.println("========= GET DATA FAILED ===========");
            return ResponseEntity.notFound().build();
        }
    }
    //http://localhost:8080/getQuestion/{id}
  }
    

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
    
    
    // @PostMapping("/insertForm")
    // public ResponseEntity<Form> createForm(@RequestBody(required = false) String form) {
    // try {
    //   // logic handling of the Form to fit object Form
    //     //String[] intArray = new String[]{ "FormSection2","FormSection2" }; 
    //     Form _Form = FormRepository.save(new Form(form, 3, null  , "Ratio", "Safety Pre-Check Form 2"));
    //     // System.out.println(form);
    //     return new ResponseEntity<>(_Form, HttpStatus.CREATED);
    //   } catch (Exception e) {
    //     return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
    //   }
    // }

    // FormRepository.findAll()
    // @GetMapping("/allForm/{id}")
    // public ResponseEntity<?> getFormById(@PathVariable("id") String id) {
    //   Optional<Form> Form = FormRepository.findById(id);
    
    //   if (Form.isPresent()) {
    //     return new ResponseEntity<>(Form.get(), HttpStatus.OK);
    //   } else {
    //     return new ResponseEntity<>("Form Not Found", HttpStatus.NOT_FOUND);
    //   }
    // }


    

  


