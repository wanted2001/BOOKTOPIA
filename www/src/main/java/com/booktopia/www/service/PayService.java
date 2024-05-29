package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.KakaoReadyResponse;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PayService {

    void saveOrder(String id, List<OrderInfoDTO> orderInfoDTO);

}
