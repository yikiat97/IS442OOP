package com.java.project.repository;

import com.java.project.model.Email;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EmailRepository extends MongoRepository<Email, String> {
    //String toEmail, String body, String subject, String attachment

    @Query("{relatedId:'?0'}")
    List<Email> findEmailByRelatedId(String relatedId);

    @Query("{type:'?0'}")
    List<Email> findEmailByType(String type);

    @Query("{status:'?0'}")
    List<Email> findEmailByStatus(String status);
}
