package com.java.project.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.exception.DataNotFoundException;
import com.java.project.exception.GlobalExceptionHandler;
import com.java.project.model.VendorWorkflow;
import com.java.project.model.VendorWorkflowMappingDTO;
import com.java.project.repository.VendorWorkflowRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/vendorWorkflow")
public class VendorWorkflowController {
    @Autowired
    VendorWorkflowRepository VendorWorkflowRepository;

    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;

    // JSON FORMAT FOR CREATING VENDORWORKFLOW
    // {
    // "forms": ["Vendor Assessment", "Pre-Evaluation Form", "Health Performance"],
    // "vendorWorkflowName": "Vendor Onboarding",
    // "status": "Pending",
    // "email": "elmer@gmail.com"
    // "company": "ek bank"
    // "date": "DD/MM/YYYY"
    // "name": "elmer"
    // }
    @PostMapping("/insertVendorWorkflow")
    public ResponseEntity<?> createVendorWorkflow(
            @RequestBody(required = false) VendorWorkflowMappingDTO VendorWorkflowDTO) {
            // logic handling of the workflow json to fit object workflow
            // Use a DTO to map forms and workflowName for creation of forms

            List<String> forms = VendorWorkflowDTO.getForms();
            String vendorWorkflowName = VendorWorkflowDTO.getVendorWorkflowName();
            String status = VendorWorkflowDTO.getStatus();
            String email = VendorWorkflowDTO.getEmail();
            String company = VendorWorkflowDTO.getCompany();
            String date = VendorWorkflowDTO.getDate();
            String name = VendorWorkflowDTO.getName();
            if(vendorWorkflowName == null || status == null || email == null || company == null || date == null || name == null){
                throw new IllegalArgumentException("One or more of the fields is missing or incorrect"); 
            }
            VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                    .save(new VendorWorkflow(null, forms, vendorWorkflowName, status, email, company, date, name));
            // System.out.println(form);
            return new ResponseEntity<>(_VendorWorkflow, HttpStatus.CREATED);
    }

    // routing to get vendorWorkflow by id
    @GetMapping("/vendorWorkflowByID/{id}")
    public ResponseEntity<VendorWorkflow> getVendorWorkflowById(@PathVariable("id") String id) {
        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);

        if (VendorWorkflow.isPresent()) {
            return ResponseEntity.ok(VendorWorkflow.get());
        } else {
            throw new DataNotFoundException("Workflow Not Found");
        }
    }

    // Routing to gett all vendorWorkflows in the collection
    @GetMapping("/allVendorWorkflow")
    public ResponseEntity<List<VendorWorkflow>> getAllWorkflow() {
        List<VendorWorkflow> VendorWorkflows = VendorWorkflowRepository.findAll();

        if (!VendorWorkflows.isEmpty()) {
            return ResponseEntity.ok(VendorWorkflows);
        } else {
            throw new DataNotFoundException("Workflows not found.");
        }
    }

    // When status is set to approved, the date is changed to current date
    // JSON format

    // "6412eaf10bf80f2c012bd872",

    // id is a mandatory field to input
    // status to be automatically updated, dont need for updateMappingDTO
    @PutMapping("/approveVendorWorkflow")
    public ResponseEntity<VendorWorkflow> approveVendorWorkflow(
            @RequestBody(required = false) String id) {

        // map the json object so that id, forms and workflowname can be manipulated
        // List<String> forms = VendorWorkflowUpdateMappingDTO.getForms();
        // String vendorWorkflowName =
        // VendorWorkflowUpdateMappingDTO.getVendorWorkflowName();
        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);
        if (VendorWorkflow.isPresent()) {
            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String formattedDate = currentDate.format(formatter);
            // System.out.println(newStatus);
            // System.out.println(VendorWorkflow.get().getStatus());
            // if status changes to approve, then change the date to current date
            VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                    .save(new VendorWorkflow(VendorWorkflow.get().getId(), VendorWorkflow.get().getForms(),
                            VendorWorkflow.get().getWorkflowName(), "Approved",
                            VendorWorkflow.get().getEmail(), VendorWorkflow.get().getCompany(), formattedDate,
                            VendorWorkflow.get().getName()));
            return ResponseEntity.ok(_VendorWorkflow);

        } else {
            throw new DataNotFoundException("Workflow Not Found");
        }

        // System.out.println(form);

    }

    // Path after approval of all forms
    // JSON format

    // "6412eaf10bf80f2c012bd872",

    // id is a mandatory field to input
    @PutMapping("/rejectVendorWorkflow")
    public ResponseEntity<VendorWorkflow> rejectVendorWorkflow(
            @RequestBody(required = false) String id) {
        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);
        if (VendorWorkflow.isPresent()) {
            // System.out.println(newStatus);
            // System.out.println(VendorWorkflow.get().getStatus());
            // if status changes to approve, then change the date to current date
            VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                    .save(new VendorWorkflow(VendorWorkflow.get().getId(), VendorWorkflow.get().getForms(),
                            VendorWorkflow.get().getWorkflowName(), "Rejected",
                            VendorWorkflow.get().getEmail(), VendorWorkflow.get().getCompany(),
                            VendorWorkflow.get().getDate(),
                            VendorWorkflow.get().getName()));
            return ResponseEntity.ok(_VendorWorkflow);

        } else {
            throw new DataNotFoundException("Workflow Not Found");
        }
    }

    // Path to delete workflow here
    // @DeleteMapping("/deleteVendorWorkflow/{id}")
    // public ResponseEntity<?> deleteVendorWorkflowById(@PathVariable("id") String
    // id) {
    // System.out.println(id);
    // Optional<VendorWorkflow> VendorWorkflow =
    // VendorWorkflowRepository.findById(id);

    // if (VendorWorkflow.isPresent()) {
    // VendorWorkflowRepository.deleteById(id);
    // return new ResponseEntity<>("Workflow deleted", HttpStatus.NO_CONTENT);
    // } else {
    // return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
    // }
    // }

    // Path to soft delete vendor workflow

    // JSON format

    // "6412eaf10bf80f2c012bd872",

    // id is a mandatory field to input
    @PutMapping("/deleteVendorWorkflow")
    public ResponseEntity<VendorWorkflow> deleteVendorWorkflow(
            @RequestBody(required = false) String id) {
        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);
        if (VendorWorkflow.isPresent()) {
            // System.out.println(newStatus);
            // System.out.println(VendorWorkflow.get().getStatus());
            // if status changes to approve, then change the date to current date
            VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                    .save(new VendorWorkflow(VendorWorkflow.get().getId(), VendorWorkflow.get().getForms(),
                            VendorWorkflow.get().getWorkflowName(), "Deleted",
                            VendorWorkflow.get().getEmail(), VendorWorkflow.get().getCompany(),
                            VendorWorkflow.get().getDate(),
                            VendorWorkflow.get().getName()));
            return ResponseEntity.ok(_VendorWorkflow);

        } else {
            throw new DataNotFoundException("Workflow Not Found");
        }
    }

}
