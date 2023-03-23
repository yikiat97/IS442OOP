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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

    @GetMapping("/getEmails")
    public ResponseEntity getEmails(){
        List<User> userList = UserRepository.findAll();
        List<String> emailList = new ArrayList<>();
        for (User user: userList
             ) {
            emailList.add(user.getEmail());
        }
        if(userList != null){
            return ResponseEntity.ok(emailList);
        }else{
            return new ResponseEntity<>("Something went wrong", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/getUser")
    public ResponseEntity getUserByEmail(@RequestParam String email){
        User user = UserRepository.findUserByEmail(email);
        if(user!=null){
            List<String> userInfoList = new ArrayList<>();
            userInfoList.add(user.getName());
            userInfoList.add(user.getContactNumber());
            userInfoList.add(user.getRole());
            userInfoList.add(user.getCompany());
            return ResponseEntity.ok(userInfoList);
        }else {
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/editUser")
    public ResponseEntity editUser(@RequestBody User editUser){
        User user = UserRepository.findUserByEmail(editUser.getEmail());
        user.setName(editUser.getName());
        user.setContactNumber(editUser.getContactNumber());
        UserRepository.save(user);
        return ResponseEntity.ok(user);
    }

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
            newAdmin.setUserName(newAdmin.getEmail(), newAdmin.getRole());
            Admin admin = UserRepository.save(newAdmin);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
//            try{
//                EmailService.sendEmail(admin.getEmail(),emailBody,"Account created for Quantum VMS","");
                return ResponseEntity.ok(admin);
//            }catch (MailException e){
//                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
//            }catch(MessagingException e) {
//                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
//            }
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
            newApprover.setUserName(newApprover.getEmail(), newApprover.getRole());
            Approver approver = UserRepository.save(newApprover);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
//            try{
//                EmailService.sendEmail(approver.getEmail(),emailBody,"Account created for Quantum VMS","");
                return ResponseEntity.ok(approver);
//            }catch (MailException e){
//                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
//            }catch(MessagingException e) {
//                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
//            }
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
            newVendor.setUserName(newVendor.getEmail(), newVendor.getRole());
            Vendor vendor = UserRepository.save(newVendor);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
//            try{
//                EmailService.sendEmail(vendor.getEmail(),emailBody,"Account created for Quantum VMS","");
                return ResponseEntity.ok(vendor);
//            }catch (MailException e){
//                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
//            }catch(MessagingException e){
//                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
//            }
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

    @PostMapping(value = "/forgetPassword")
    public ResponseEntity forgetPassword(@RequestParam String email){
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

    @PutMapping(value = "/changePassword")
    public ResponseEntity changePassword(@RequestParam String email, @RequestParam String oldPassword, @RequestParam String newPassword){
        User user = UserRepository.findUserByEmail(email);
        if(user!=null){
            if(userService.passwordCheck(oldPassword, user.getPassword())){
                String encodedPassword = userService.encryptPassword(newPassword);
                user.setPassword(encodedPassword);
                User savedUser = UserRepository.save(user);
                return ResponseEntity.ok(savedUser);
            }else{
                return new ResponseEntity<>("Old password is wrong", HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<>("No such email found", HttpStatus.UNAUTHORIZED);
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
