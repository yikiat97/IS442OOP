package com.java.project.repository;

import com.java.project.model.Approver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApproverRepository extends MongoRepository<Approver, String> {
}
