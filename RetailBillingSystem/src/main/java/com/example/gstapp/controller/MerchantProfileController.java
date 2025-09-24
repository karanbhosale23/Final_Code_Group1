package com.example.gstapp.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.gstapp.model.MerchantProfile;
import com.example.gstapp.service.MerchantProfileService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/merchant-profile")
public class MerchantProfileController {

    private final MerchantProfileService profileService;

    public MerchantProfileController(MerchantProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody MerchantProfile profile) {
        try {
            MerchantProfile saved = profileService.createProfile(profile);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
