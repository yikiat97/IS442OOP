package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import com.java.project.model.Form;

public interface FormRepository extends MongoRepository<Form, String> {
    // String findByNameContain(String FormName);

    //@Query("SELECT c FROM Company c WHERE c.name = :name AND c.status = :status")
    //Company findCompanyByNameAndStatus(@Param("name") String name, @Param("status") String status);
}
