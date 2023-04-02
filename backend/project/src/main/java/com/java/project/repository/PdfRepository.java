package com.java.project.repository;

import com.java.project.model.Pdf;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PdfRepository extends MongoRepository<Pdf, String> {

    @Query("{workflowID:'?0'}")
    List<Pdf> findPdfByWorkflowForm(String workflowID);
}
