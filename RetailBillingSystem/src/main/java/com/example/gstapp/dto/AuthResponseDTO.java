// src/main/java/com/example/gstapp/dto/AuthResponseDTO.java
package com.example.gstapp.dto;

public class AuthResponseDTO {
    private String token;
    private String username;
    private String role;
    private Long id;
    private String email;
    private String phoneNumber;
    private String businessName;

    // Merchant Profile Fields
    private String gstin;
    private String phoneNumber2;
    private String businessAddress;
    private String pincode;
    private String businessDescription;
    private String state;
    private String businessType;
    private String businessCategory;
    private String signatureBase64;
    private String signatureUrl;

    public AuthResponseDTO() {
    }

    public AuthResponseDTO(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public AuthResponseDTO(String token, String username, String role, Long id, String email, String phoneNumber,
            String businessName) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.businessName = businessName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    // Merchant Profile Getters and Setters

    public String getGstin() {
        return gstin;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    public String getPhoneNumber2() {
        return phoneNumber2;
    }

    public void setPhoneNumber2(String phoneNumber2) {
        this.phoneNumber2 = phoneNumber2;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getBusinessDescription() {
        return businessDescription;
    }

    public void setBusinessDescription(String businessDescription) {
        this.businessDescription = businessDescription;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getBusinessCategory() {
        return businessCategory;
    }

    public void setBusinessCategory(String businessCategory) {
        this.businessCategory = businessCategory;
    }

    public String getSignatureBase64() {
        return signatureBase64;
    }

    public void setSignatureBase64(String signatureBase64) {
        this.signatureBase64 = signatureBase64;
    }

    public String getSignatureUrl() {
        return signatureUrl;
    }

    public void setSignatureUrl(String signatureUrl) {
        this.signatureUrl = signatureUrl;
    }
}
