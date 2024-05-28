package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.OrderInfoDTO;

import java.util.List;

public interface PayService {

    void saveOrder(String id, List<OrderInfoDTO> orderInfoDTO);

}
