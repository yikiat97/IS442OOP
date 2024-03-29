package com.java.project.repository;

import com.java.project.model.Company;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface CompanyRepository extends MongoRepository<Company, String> {
    @Query("{name:'?0'}")
    Company findCompanyByName(String name);

    @Query
    Long deleteByName(String name);
}
