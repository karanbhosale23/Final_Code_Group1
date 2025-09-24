package com.example.gstapp.repository;

import com.example.gstapp.model.MerchantProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MerchantProfileRepository extends JpaRepository<MerchantProfile, Long> {
    // You can add custom queries if needed
}
