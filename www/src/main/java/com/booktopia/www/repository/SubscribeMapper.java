package com.booktopia.www.repository;

import com.booktopia.www.domain.SubscribeInfoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubscribeMapper {

    SubscribeInfoVO getPayInfo(int month);
}
