package com.java.project.repository;


//import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.java.project.model.Question; 

public interface QuestionRepository extends MongoRepository<Question, String> {
    // String findByNameContain(String FormName);
}