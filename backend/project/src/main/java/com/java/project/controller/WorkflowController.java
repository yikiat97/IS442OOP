package com.java.project.controller;

import java.util.Optional;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default;
import com.java.project.model.Workflow;
import com.java.project.model.WorkflowMappingDTO;
import com.java.project.model.WorkflowUpdateMappingDTO;
import com.java.project.repository.WorkflowRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/workflow")
public class WorkflowController {
  @Autowired
  WorkflowRepository WorkflowRepository;

  // JSON Format for creation of workflow
  // {
  // "forms": ["Vendor Assessment", "Pre-Evaluation Form", "Health Performance"],
  // "workflowName": "Vendor Onboarding"
  // }
  @PostMapping("/insertWorkflow")
  public ResponseEntity<Workflow> createWorkflow(@RequestBody(required = false) WorkflowMappingDTO WorkflowDTO) {
    try {
      // logic handling of the workflow json to fit object workflow
      // Use a DTO to map forms and workflowName for creation of forms

      List<String> forms = WorkflowDTO.getForms();
      String workflowName = WorkflowDTO.getWorkflowName();

      Workflow _Workflow = WorkflowRepository.save(new Workflow(null, forms, workflowName));
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

  // Path to update workflow here
  // JSON format
  // {
  // "id" : "6412eaf10bf80f2c012bd872",
  // "forms": ["Vendor Assessment", "Pre-Evaluation Form", "Health Performance"],
  // "workflowName": "Vendor Onboarding",
  // }
  // id is the only mandatory field to input
  // forms can be left null if not updating forms
  // workflowName can be left "" if not updating workflowName
  @PutMapping("/updateWorkflow")
  public ResponseEntity<?> updateWorkflow(
      @RequestBody(required = false) WorkflowUpdateMappingDTO WorkflowUpdateMappingDTO) {

    // map the json object so that id, forms and workflowname can be manipulated
    String id = WorkflowUpdateMappingDTO.getId();
    List<String> forms = WorkflowUpdateMappingDTO.getForms();
    String workflowName = WorkflowUpdateMappingDTO.getWorkflowName();
    Optional<Workflow> Workflow = WorkflowRepository.findById(id);

    if (Workflow.isPresent()) {
      List<String> newForms = (forms == null) ? Workflow.get().getForms() : forms;
      String newWorkflowName = (workflowName == "") ? Workflow.get().getWorkflowName() : workflowName;
      Workflow _Workflow = WorkflowRepository
          .save(new Workflow(Workflow.get().getId(), newForms, newWorkflowName));
      return new ResponseEntity<>(_Workflow, HttpStatus.OK);
    } else {
      return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
    }

    // System.out.println(form);

  }

  // Path to delete workflow here
  @DeleteMapping("/deleteWorkflow/{id}")
  public ResponseEntity<?> deleteWorkflowById(@PathVariable("id") String id) {
    System.out.println(id);
    Optional<Workflow> Workflow = WorkflowRepository.findById(id);

    if (Workflow.isPresent()) {
      WorkflowRepository.deleteById(id);
      return new ResponseEntity<>("Workflow deleted", HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
    }
  }
}
