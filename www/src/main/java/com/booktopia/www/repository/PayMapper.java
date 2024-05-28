package com.booktopia.www.repository;

import com.booktopia.www.domain.PayVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PayMapper {
    void insertOrder(PayVO pvo);

}
