package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.OrderInfoVO;

public interface OrderInfoService {

    void insertPayInfo(OrderInfoDTO orderinfoDTO);

    int insertRegister(OrderInfoDTO oidto);


    OrderInfoDTO getSuccessPayInfo(OrderInfoDTO oidto);

    void isnert(OrderInfoVO oivo);
}
