package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.CouponInfoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CouponInfoMapper {
    List<CouponInfoDTO> getcoulist(String id);
}