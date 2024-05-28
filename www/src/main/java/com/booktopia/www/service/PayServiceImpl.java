package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.repository.PayMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    private final PayMapper payMapper;

    @Override
    public void saveOrder(String id, List<OrderInfoDTO> orderInfoDTO) {

    }
}
