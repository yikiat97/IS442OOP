package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.java.project.model.User;


//MongoRepository’s default methods: save(), findOne(), findById(), findAll(), count(), delete(), deleteById()
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{name:'?0'}")
    User findItemByName(String name);
    
    @Query(value="{email:'?0'}", fields="{'name' : 1, 'role' : 1}")
    List<User> findAll(String category);
    
    public long count();

    
}
