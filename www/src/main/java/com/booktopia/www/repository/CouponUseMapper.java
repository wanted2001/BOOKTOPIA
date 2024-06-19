package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.CouponInfoDTO;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CouponUseMapper {
    void insertCouponUse(OrderInfoDTO oidto);

    void insertUserCoupon(String id);

    List<CouponInfoDTO> getCoupon(@Param("id") String id, @Param("couNo") int couNo);
}
