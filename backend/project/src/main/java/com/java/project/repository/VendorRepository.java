package com.java.project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.java.project.model.Vendor;

public interface VendorRepository extends MongoRepository<Vendor, String> {

}
