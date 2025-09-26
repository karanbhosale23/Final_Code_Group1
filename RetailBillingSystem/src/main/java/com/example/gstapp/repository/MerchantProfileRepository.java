package com.example.gstapp.repository;

import com.example.gstapp.model.MerchantProfile;
import com.example.gstapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MerchantProfileRepository extends JpaRepository<MerchantProfile, Long> {
    Optional<MerchantProfile> findByUser(User user);
}
