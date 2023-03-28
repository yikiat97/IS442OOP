package com.java.project.repository;

import com.java.project.model.Email;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface EmailRepository extends MongoRepository<Email, String> {
    //String toEmail, String body, String subject, String attachment

    @Query("{vendorWorkflowId:'?0'}")
    Email findEmailByWorflowId(String vendorWorkflowId);
}
