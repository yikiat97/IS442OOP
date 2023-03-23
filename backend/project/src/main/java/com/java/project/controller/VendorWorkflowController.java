package com.java.project.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.model.VendorWorkflow;
import com.java.project.model.VendorWorkflowMappingDTO;
import com.java.project.model.VendorWorkflowUpdateMappingDTO;
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

    // JSON FORMAT FOR CREATING VENDORWORKFLOW
    // {
    //     "forms": ["Vendor Assessment", "Pre-Evaluation Form", "Health Performance"],
    //     "vendorWorkflowName": "Vendor Onboarding",
    //     "status": "Pending",
    //     "email": "elmer@gmail.com"
    //     "company": "ek bank"
    //     "date": "DD/MM/YYYY"
    //     "name": "elmer"
    // }
    @PostMapping("/insertVendorWorkflow")
    public ResponseEntity<VendorWorkflow> createVendorWorkflow(
            @RequestBody(required = false) VendorWorkflowMappingDTO VendorWorkflowDTO) {
        try {
            // logic handling of the workflow json to fit object workflow
            // Use a DTO to map forms and workflowName for creation of forms

            List<String> forms = VendorWorkflowDTO.getForms();
            String vendorWorkflowName = VendorWorkflowDTO.getVendorWorkflowName();
            String status = VendorWorkflowDTO.getStatus();
            String email = VendorWorkflowDTO.getEmail();
            String company = VendorWorkflowDTO.getCompany();
            String date = VendorWorkflowDTO.getDate();
            String name = VendorWorkflowDTO.getName();

            VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                    .save(new VendorWorkflow(null, forms, vendorWorkflowName, status, email, company, date, name));
            // System.out.println(form);
            return new ResponseEntity<>(_VendorWorkflow, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // routing to get vendorWorkflow by id
    @GetMapping("/vendorWorkflowByID/{id}")
    public ResponseEntity<?> getVendorWorkflowById(@PathVariable("id") String id) {
        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);

        if (VendorWorkflow.isPresent()) {
            return new ResponseEntity<>(VendorWorkflow.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
        }
    }

    // Routing to gett all vendorWorkflows in the collection
    @GetMapping("/allVendorWorkflow")
    public ResponseEntity<?> getAllWorkflow() {
        List<VendorWorkflow> VendorWorkflows = VendorWorkflowRepository.findAll();

        if (!VendorWorkflows.isEmpty()) {
            return new ResponseEntity<>(VendorWorkflows, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Workflows Not Found", HttpStatus.NOT_FOUND);
        }
    }

    // When status is set to approved, the date is changed to current date
    // JSON format
    // {
    // "id" : "6412eaf10bf80f2c012bd872",
    // "status": "Approved"
    // }
    // id is a mandatory field to input
    // Status is also a mandatory field to input
    @PutMapping("/updateVendorWorkflowStatus")
    public ResponseEntity<?> updateVendorWorkflowStatus(
            @RequestBody(required = false) VendorWorkflowUpdateMappingDTO VendorWorkflowUpdateMappingDTO) {

        // map the json object so that id, forms and workflowname can be manipulated
        String id = VendorWorkflowUpdateMappingDTO.getId();
        // List<String> forms = VendorWorkflowUpdateMappingDTO.getForms();
        // String vendorWorkflowName = VendorWorkflowUpdateMappingDTO.getVendorWorkflowName();
        String status = VendorWorkflowUpdateMappingDTO.getStatus();

        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);
        if (VendorWorkflow.isPresent()) {

            String newStatus = (status == "") ? VendorWorkflow.get().getStatus() : status;
            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String formattedDate = currentDate.format(formatter);
            // System.out.println(newStatus);
            // System.out.println(VendorWorkflow.get().getStatus());
            // if status changes to approve, then change the date to current date
            if (status.equals("Approved") && !VendorWorkflow.get().getStatus().equals("Approved")){
                VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                .save(new VendorWorkflow(VendorWorkflow.get().getId(), VendorWorkflow.get().getForms(), VendorWorkflow.get().getWorkflowName(), newStatus,
                        VendorWorkflow.get().getEmail(), VendorWorkflow.get().getCompany(), formattedDate, VendorWorkflow.get().getName()));
                return new ResponseEntity<>(_VendorWorkflow, HttpStatus.OK);
            }
            else{
                VendorWorkflow _VendorWorkflow = VendorWorkflowRepository
                .save(new VendorWorkflow(VendorWorkflow.get().getId(), VendorWorkflow.get().getForms(), VendorWorkflow.get().getWorkflowName(), newStatus,
                        VendorWorkflow.get().getEmail(), VendorWorkflow.get().getCompany(), VendorWorkflow.get().getDate(), VendorWorkflow.get().getName()));
                return new ResponseEntity<>(_VendorWorkflow, HttpStatus.OK);
            }
            
        } else {
            return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
        }

        // System.out.println(form);

    }

    // Path to delete workflow here
    @DeleteMapping("/deleteVendorWorkflow/{id}")
    public ResponseEntity<?> deleteVendorWorkflowById(@PathVariable("id") String id) {
        System.out.println(id);
        Optional<VendorWorkflow> VendorWorkflow = VendorWorkflowRepository.findById(id);

        if (VendorWorkflow.isPresent()) {
            VendorWorkflowRepository.deleteById(id);
            return new ResponseEntity<>("Workflow deleted", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Workflow Not Found", HttpStatus.NOT_FOUND);
        }
    }
    // Path to update the status and change the date after the workflow is approved
    // @PutMapping("/updateVendorWorkflowStatus")
    // public ResponseEntity<?> deleteVendorWorkflowById(@PathVariable("id") String id) {

    // }
}
