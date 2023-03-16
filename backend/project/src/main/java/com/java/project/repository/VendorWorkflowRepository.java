package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import com.java.project.model.VendorWorkflow;

public interface VendorWorkflowRepository extends MongoRepository<VendorWorkflow, String> {
    // String findByNameContain(String FormName);
}