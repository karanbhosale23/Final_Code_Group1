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

    // Add update/delete/get-by-user methods as needed!
}
