package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DeliveryVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeliMapeer {
    void insertDeli(OrderInfoDTO oidto);

    List<DeliveryVO> getList();

    void updateStaus(String deliUid);
}
