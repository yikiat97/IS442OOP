package com.java.project.controller;

import java.util.Optional;
import java.util.*;

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
import com.java.project.model.WorkflowMappingDTO;
import com.java.project.repository.WorkflowRepository;
import com.java.project.service.SequenceGeneratorService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/workflow")
public class WorkflowController {
    @Autowired
    WorkflowRepository WorkflowRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @PostMapping("/insertWorkflow")
    public ResponseEntity<Workflow> createForm(@RequestBody(required = false) WorkflowMappingDTO WorkflowDTO) {
    try {
      // logic handling of the workflow json to fit object workflow
        // handle String Workflow such that it can add in List<> to constructor
        // need to change the way autoincrement of documents is done, maybe via using a document
        // can use a DTO to map forms and workflowName for creation of forms

        int nextID= sequenceGeneratorService.generateSequence("Workflow");
        String workflowID = "workflow" + Long.toString(nextID);
        List<String> forms = WorkflowDTO.getForms();
        String workflowName = WorkflowDTO.getWorkflowName();

        Workflow _Workflow = WorkflowRepository.save(new Workflow(workflowID, nextID, forms, workflowName));
        // System.out.println(form);
        return new ResponseEntity<>(_Workflow, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
    }
    }


    // routing to get workflow by id
    @GetMapping("/WorkflowByID/{id}")
    public ResponseEntity<?> getWorkflowById(@PathVariable("id") String id) {
      Optional<Workflow> Workflow = WorkflowRepository.findById(id);
    
      if (Workflow.isPresent()) {
        return new ResponseEntity<>(Workflow.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
      }
    }

    // Routing to gett all workflows in the collection
    @GetMapping("/allWorkflow")
    public ResponseEntity<?> getAllWorkflow() {
      List<Workflow> Workflows = WorkflowRepository.findAll();
    
      if (!Workflows.isEmpty()) {
        return new ResponseEntity<>(Workflows, HttpStatus.OK);
      } else {
        return new ResponseEntity<>("Workflows Not Found", HttpStatus.NOT_FOUND);
      }
    }
}
