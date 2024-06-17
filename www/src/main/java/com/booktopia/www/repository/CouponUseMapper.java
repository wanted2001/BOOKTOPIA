package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CouponUseMapper {
    void insertCouponUse(OrderInfoDTO oidto);
}
