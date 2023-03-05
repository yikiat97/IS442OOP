package com.java.project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default;
import com.java.project.model.Workflow;
import com.java.project.repository.WorkflowRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/workflow")
public class WorkflowController {
    @Autowired
    WorkflowRepository WorkflowRepository;

    @PostMapping("/insertWorkflow")
    public ResponseEntity<Workflow> createForm(@RequestBody(required = false) String Workflow) {
    try {
      // logic handling of the Form to fit object Form
        //String[] intArray = new String[]{ "FormSection2","FormSection2" }; 
        // handle String Workflow such that it can add in List<> to constructor
        Workflow _Workflow = WorkflowRepository.save(new Workflow(Workflow, 3, null, "Vendor Registration"));
        // System.out.println(form);
        return new ResponseEntity<>(_Workflow, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
    }
    }

    @GetMapping("/allWorkflow/{id}")
    public ResponseEntity<?> getWorkflowById(@PathVariable("id") String id) {
      Optional<Workflow> Workflow = WorkflowRepository.findById(id);
    
      if (Workflow.isPresent()) {
        return new ResponseEntity<>(Workflow.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
      }
    }

}
