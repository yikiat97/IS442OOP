package com.java.project.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.java.project.model.User;


//MongoRepository’s default methods: save(), findOne(), findById(), findAll(), count(), delete(), deleteById()
public interface UserRepository extends MongoRepository<User, String> {
    public long count();

    @Query("{email:'?0'}")
    User findUserByEmail(String email);

    @Query("{companyRegistrationNum:'?0'}")
    List<User> findUserByCompanyRegistrationNum(String companyRegistrationNum);

    @Query("{userName:'?0'}")
    User findUserByUsername(String userName);

    @Query("{role:'?0'}")
    List<User> findByRole(String role);

    @Query("{role:'?0'}")
    List<User> findByRoleAndDeletedIsFalse(String role);

    @Query
    Long deleteByEmail(String email);

}
