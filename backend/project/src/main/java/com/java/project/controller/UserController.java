package com.java.project.controller;

import com.java.project.model.*;
import com.java.project.repository.CompanyRepository;
import com.java.project.repository.UserRepository;
import com.java.project.service.EmailSenderService;
import com.java.project.service.UserService;
import jakarta.mail.MessagingException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/login")
public class UserController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    EmailSenderService EmailService;

    @Autowired
    UserService userService;

    @Autowired
    CompanyRepository CompanyRepository;

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody User userDetails) {
        User user = UserRepository.findUserByEmail(userDetails.getEmail());
        if (user == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }
        if (!userService.passwordCheck(userDetails.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Password does not match", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(user.getRole());
    }

    @PostMapping(value = "/createAdmin", consumes = "application/json", produces = "application/json")
    public ResponseEntity createAdmin(@RequestBody Admin newAdmin) {
        if(!userService.checkEmailExists(newAdmin.getEmail())){
            String rawPassword = newAdmin.generateCommonLangPassword();
            String encodedPassword = userService.encryptPassword(rawPassword);
            newAdmin.setPassword(encodedPassword);
            Admin admin = UserRepository.save(newAdmin);

            Company company = CompanyRepository.findCompanyByName(newAdmin.getCompany());
            company.addUser(newAdmin.getUserName());
            CompanyRepository.deleteByName(newAdmin.getCompany());
            Company newCompany = CompanyRepository.save(company);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
            try{
                EmailService.sendEmail(admin.getEmail(),emailBody,"Account created for Quantum VMS","");
                return ResponseEntity.ok(admin);
            }catch (MailException e){
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e) {
                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }

    }

    @PostMapping(value = "/createApprover", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createApprover(@RequestBody Approver newApprover) {
        if(!userService.checkEmailExists(newApprover.getEmail())) {
            String rawPassword = newApprover.generateCommonLangPassword();
            String encodedPassword = userService.encryptPassword(rawPassword);
            newApprover.setPassword(encodedPassword);
            Approver approver = UserRepository.save(newApprover);

            Company company = CompanyRepository.findCompanyByName(newApprover.getCompany());
            company.addUser(newApprover.getUserName());
            CompanyRepository.deleteByName(newApprover.getCompany());
            Company newCompany = CompanyRepository.save(company);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
            try{
                EmailService.sendEmail(approver.getEmail(),emailBody,"Account created for Quantum VMS","");
                return ResponseEntity.ok(approver);
            }catch (MailException e){
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e) {
                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }
    }

    @PostMapping(value = "/createVendor", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createVendor(@RequestBody Vendor newVendor) {
        if(!userService.checkEmailExists(newVendor.getEmail())) {
            String rawPassword = newVendor.generateCommonLangPassword();
            String encodedPassword = userService.encryptPassword(rawPassword);
            newVendor.setPassword(encodedPassword);
            Vendor vendor = UserRepository.save(newVendor);

            Company company = CompanyRepository.findCompanyByName(newVendor.getCompany());
            company.addUser(newVendor.getUserName());
            CompanyRepository.deleteByName(vendor.getCompany());
            Company newCompany = CompanyRepository.save(company);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
            try{
                EmailService.sendEmail(vendor.getEmail(),emailBody,"Account created for Quantum VMS","");
                return ResponseEntity.ok(vendor);
            }catch (MailException e){
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e){
                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/numUsers")
    public ResponseEntity numUsers(){
        JSONObject userCount = new JSONObject();
        int vendorCount = UserRepository.findByRole("Vendor").size();
        int adminCount = UserRepository.findByRole("Admin").size();
        int approverCount = UserRepository.findByRole("Approver").size();
        userCount.put("Vendor", vendorCount);
        userCount.put("Admin", adminCount);
        userCount.put("Approver", approverCount);
        return ResponseEntity.ok(userCount);
    }

    @PostMapping(value = "/changePassword")
    public ResponseEntity changePassword(@RequestParam String email){
        User user = UserRepository.findUserByEmail(email);

        String rawPassword = user.generateCommonLangPassword();
        String encodedPassword = userService.encryptPassword(rawPassword);
        user.setPassword(encodedPassword);
        UserRepository.deleteByEmail(email);

        User userSaved = UserRepository.save(user);
        String emailBody = "You have requested to change your password. Your new password is: "+ rawPassword;
        try{
            EmailService.sendEmail(userSaved.getEmail(),emailBody,"Change password for Quantum VMS","");
            return ResponseEntity.ok(userSaved);
        }catch (MailException e){
            return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
        }catch(MessagingException e){
            return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity deleteUser(@RequestParam String email){
        if(userService.checkEmailExists(email)){
            UserRepository.deleteByEmail(email);
            return ResponseEntity.ok("ok");
        }else{
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/getVendors")
    public ResponseEntity getVendors(){
        List<User> Vendors = UserRepository.findByRole("Vendor");
        Map<String, List<User>> vendorMap = Vendors.stream().collect(Collectors.groupingBy(User::getCompany));
        return ResponseEntity.ok(vendorMap);
    }

    @GetMapping("/getAdmins")
    public ResponseEntity getAdmins(){
        List<User> Vendors = UserRepository.findByRole("Admin");
        Map<String, List<User>> vendorMap = Vendors.stream().collect(Collectors.groupingBy(User::getCompany));
        return ResponseEntity.ok(vendorMap);
    }

    @GetMapping("/getApprovers")
    public ResponseEntity getApprovers(){
        List<User> Vendors = UserRepository.findByRole("Approver");
        Map<String, List<User>> vendorMap = Vendors.stream().collect(Collectors.groupingBy(User::getCompany));
        return ResponseEntity.ok(vendorMap);
    }
}
