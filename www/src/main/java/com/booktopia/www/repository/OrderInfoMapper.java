package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.OrderUserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderInfoMapper {
    void regiOrderUser(OrderUserDTO oudto);
}
