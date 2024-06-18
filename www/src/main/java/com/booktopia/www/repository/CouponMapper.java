package com.booktopia.www.repository;

import com.booktopia.www.domain.AdCouponVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CouponMapper {
    AdCouponVO getCoupon(int couNo);

    float getSaleAmount(int couNo);
}
