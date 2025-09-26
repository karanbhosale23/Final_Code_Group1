package com.example.gstapp.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.*;

@Entity
@Table(name = "merchant_profiles")
public class MerchantProfile implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to User entity for business name, primary phone, and email
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Basic details
    private String gstin;

    @Column(name = "phone_number_2")
    private String phoneNumber2;

    private String pincode;

    @Column(length = 1024)
    private String businessDescription;

    @Column(name = "business_address", length = 512)
    private String businessAddress;

    // Signature stored as Base64 string or URL (choose one)
    @Lob
    @Column(name = "signature_base64", columnDefinition = "TEXT")
    private String signatureBase64;

    @Column(name = "signature_url")
    private String signatureUrl;

    // Business details
    private String state; // store as String or consider using Enum

    @Column(name = "business_type")
    private String businessType; // e.g., Retail, Distributor, Other

    @Column(name = "business_category")
    private String businessCategory; // one from categories list

    // Default constructor
    public MerchantProfile() {
    }

    // All-args constructor
    public MerchantProfile(User user, String gstin, String phoneNumber2, String pincode,
            String businessDescription, String businessAddress, String signatureBase64, String signatureUrl,
            String state, String businessType, String businessCategory) {
        this.user = user;
        this.gstin = gstin;
        this.phoneNumber2 = phoneNumber2;
        this.pincode = pincode;
        this.businessDescription = businessDescription;
        this.businessAddress = businessAddress;
        this.signatureBase64 = signatureBase64;
        this.signatureUrl = signatureUrl;
        this.state = state;
        this.businessType = businessType;
        this.businessCategory = businessCategory;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
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

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        MerchantProfile that = (MerchantProfile) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                Objects.equals(gstin, that.gstin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, gstin);
    }

    // toString()
    @Override
    public String toString() {
        return "MerchantProfile{" +
                "id=" + id +
                ", gstin='" + gstin + '\'' +
                ", phoneNumber2='" + phoneNumber2 + '\'' +
                ", pincode='" + pincode + '\'' +
                ", businessType='" + businessType + '\'' +
                ", businessCategory='" + businessCategory + '\'' +
                '}';
    }
}