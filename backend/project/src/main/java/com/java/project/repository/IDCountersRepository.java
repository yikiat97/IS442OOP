package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.java.project.model.IDCounter;

public interface IDCountersRepository extends MongoRepository<IDCounter, String> {
    // String findByNameContain(String FormName);
}