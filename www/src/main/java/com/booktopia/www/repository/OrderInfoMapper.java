package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DTO.myPagePayInfoDTO;
import com.booktopia.www.domain.OrderInfoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderInfoMapper {
    int insertRegister(OrderInfoDTO oidto);

    OrderInfoDTO getSuccessPayInfo(OrderInfoDTO oidto);

    void insert(OrderInfoVO oivo);

    List<OrderInfoDTO> selectOrderInfo(String id);
}
