package com.example.gstapp.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.gstapp.model.MerchantProfile;
import com.example.gstapp.service.MerchantProfileService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import java.io.File;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/v1/merchant-profile")
public class MerchantProfileController {

    private final MerchantProfileService profileService;

    public MerchantProfileController(MerchantProfileService profileService) {
        this.profileService = profileService;
    }

    // http://localhost:8080/api/v1/merchant-profile
    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody MerchantProfile profile) {
        try {
            MerchantProfile saved = profileService.createProfile(profile);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // http://localhost:8080/api/v1/merchant-profile/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable Long userId) {
        try {
            MerchantProfile profile = profileService.getProfileByUserId(userId);
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // http://localhost:8080/api/v1/merchant-profile/{profileId}
    @PutMapping("/{profileId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long profileId, @RequestBody MerchantProfile profile) {
        try {
            MerchantProfile updated = profileService.updateProfile(profileId, profile);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // http://localhost:8080/api/v1/merchant-profile/{profileId}
    @GetMapping("/{profileId}")
    public ResponseEntity<?> getProfileById(@PathVariable Long profileId) {
        try {
            MerchantProfile profile = profileService.getProfileById(profileId)
                    .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/upload-signature")
    public ResponseEntity<?> uploadSignature(@RequestParam("file") MultipartFile file) {
        try {
            // Define folder to save files locally
            String uploadDir = "uploads/signatures/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            // Create directories if not exist
            new File(uploadDir).mkdirs();

            // Save the file locally
            file.transferTo(new File(uploadDir + fileName));

            // Construct a public URL or relative path for frontend to use
            String fileUrl = "/uploads/signatures/" + fileName;

            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }

}
