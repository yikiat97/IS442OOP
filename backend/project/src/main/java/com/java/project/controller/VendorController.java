package com.java.project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.java.project.exception.GlobalExceptionHandler;
import com.java.project.exception.DataNotFoundException;

import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default;
import com.java.project.model.Vendor;
import com.java.project.repository.VendorRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/vendor")
public class VendorController {
  @Autowired
  VendorRepository VendorRepository;

  @Autowired
  private GlobalExceptionHandler globalExceptionHandler;

  // @PostMapping("/insertVendor")
  // public ResponseEntity<Vendor> createForm(@RequestBody(required = false)
  // String Vendor) {
  // try {
  // // logic handling of the Form to fit object Form
  // //String[] intArray = new String[]{ "FormSection2","FormSection2" };
  // // handle String Vendor such that it can add in List<> to constructor
  // Vendor _Vendor = VendorRepository.save(new Vendor(Vendor, 3, null, null,
  // null, null, null));
  // // System.out.println(form);
  // return new ResponseEntity<>(_Vendor, HttpStatus.CREATED);
  // } catch (Exception e) {
  // return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
  // }
  // }

  @GetMapping("/allVendor/{id}")
  public ResponseEntity<?> getVendorById(@PathVariable("id") String id) {
    Optional<Vendor> Vendor = VendorRepository.findById(id);

    if (Vendor.isPresent()) {
      return new ResponseEntity<>(Vendor.get(), HttpStatus.OK);
    } else {
      throw new DataNotFoundException("Vendor not found");
    }
  }

  // getVendorStatus
  // @GetMapping("/vendorStatus/{id}")
  // public ResponseEntity<?> getVendorStatusById(@PathVariable("id") String id) {
  // Optional<Vendor> Vendor = VendorRepository.findById(id);

  // if (Vendor.isPresent()) {
  // return new ResponseEntity<>(Vendor.get().getStatus(), HttpStatus.OK);
  // } else {
  // return new ResponseEntity<>("Vendor Not Found", HttpStatus.NOT_FOUND);
  // }
  // }

}
