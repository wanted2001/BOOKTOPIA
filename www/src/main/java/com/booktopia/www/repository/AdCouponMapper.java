package com.booktopia.www.repository;

import com.booktopia.www.domain.AdCouponVO;
import com.booktopia.www.domain.PagingVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdCouponMapper {

    int getCount();

    List<AdCouponVO> getList(PagingVO couponPvo);
}
