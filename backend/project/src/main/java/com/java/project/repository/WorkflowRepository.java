package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import com.java.project.model.Workflow;

public interface WorkflowRepository extends MongoRepository<Workflow, String> {
    // String findByNameContain(String FormName);
}