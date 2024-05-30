package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DTO.OrderUserDTO;

public interface OrderInfoService {
    void regiOrderUser(OrderUserDTO oudto);

    void insertPayInfo(OrderInfoDTO orderinfoDTO);

    int insertRegister(OrderInfoDTO oidto);
}
