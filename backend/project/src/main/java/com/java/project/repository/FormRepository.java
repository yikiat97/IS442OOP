package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import com.java.project.model.Form;

public interface FormRepository extends MongoRepository<Form, String> {
    // String findByNameContain(String FormName);
}
