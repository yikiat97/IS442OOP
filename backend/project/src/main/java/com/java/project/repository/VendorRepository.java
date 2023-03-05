package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import com.java.project.model.Vendor;

public interface VendorRepository extends MongoRepository<Vendor, String> {
    // String findByNameContain(String FormName);
}
