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

import com.java.project.model.VendorWorkflow;
import com.java.project.model.VendorWorkflowMappingDTO;
// import com.java.project.model.VendorWorkflowUpdateMappingDTO;
import com.java.project.repository.VendorWorkflowRepository;
import com.java.project.service.SequenceGeneratorService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/vendorWorkflow")
public class VendorWorkflowController {
    @Autowired
    VendorWorkflowRepository VendorWorkflowRepository;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    @PostMapping("/insertVendorWorkflow")
    public ResponseEntity<VendorWorkflow> createForm(@RequestBody(required = false) VendorWorkflowMappingDTO VendorWorkflowDTO) {
      try {
        // logic handling of the workflow json to fit object workflow
        // Use a DTO to map forms and workflowName for creation of forms
  
        List<String> forms = VendorWorkflowDTO.getForms();
        String vendorWorkflowName = VendorWorkflowDTO.getVendorWorkflowName();
        String status = VendorWorkflowDTO.getStatus();
        String vendorID = VendorWorkflowDTO.getVendorID();
  
        VendorWorkflow _VendorWorkflow = VendorWorkflowRepository.save(new VendorWorkflow(null, forms, vendorWorkflowName, status, vendorID));
        // System.out.println(form);
        return new ResponseEntity<>(_VendorWorkflow, HttpStatus.CREATED);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
