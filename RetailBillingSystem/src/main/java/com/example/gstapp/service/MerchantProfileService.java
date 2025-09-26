package com.example.gstapp.service;

import com.example.gstapp.model.MerchantProfile;
import com.example.gstapp.model.User;
import com.example.gstapp.repository.MerchantProfileRepository;
import com.example.gstapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MerchantProfileService {

    private final MerchantProfileRepository profileRepository;
    private final UserRepository userRepository;

    public MerchantProfileService(MerchantProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public MerchantProfile createProfile(MerchantProfile profile) {
        if (profile.getUser() == null || profile.getUser().getId() == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        User user = userRepository.findById(profile.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("No such user!"));

        profile.setUser(user);
        return profileRepository.save(profile);
    }

    public Optional<MerchantProfile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public MerchantProfile getProfileByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return profileRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found for user"));
    }

    public MerchantProfile updateProfile(Long profileId, MerchantProfile updatedProfile) {
        MerchantProfile existingProfile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));

        // Update fields
        existingProfile.setGstin(updatedProfile.getGstin());
        existingProfile.setPhoneNumber2(updatedProfile.getPhoneNumber2());
        existingProfile.setPincode(updatedProfile.getPincode());
        existingProfile.setBusinessDescription(updatedProfile.getBusinessDescription());
        existingProfile.setBusinessAddress(updatedProfile.getBusinessAddress());
        existingProfile.setSignatureBase64(updatedProfile.getSignatureBase64());
        existingProfile.setSignatureUrl(updatedProfile.getSignatureUrl());
        existingProfile.setState(updatedProfile.getState());
        existingProfile.setBusinessType(updatedProfile.getBusinessType());
        existingProfile.setBusinessCategory(updatedProfile.getBusinessCategory());

        return profileRepository.save(existingProfile);
    }
}
