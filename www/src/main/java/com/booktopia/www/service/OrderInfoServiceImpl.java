package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DTO.OrderUserDTO;
import com.booktopia.www.repository.OrderInfoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@PropertySource("classpath:secretKey.properties")
public class OrderInfoServiceImpl implements OrderInfoService{
    private final OrderInfoMapper orderInfomapper;

    @Override
    public void regiOrderUser(OrderUserDTO oudto) {
        orderInfomapper.regiOrderUser(oudto);
    }

    @Override
    public void insertPayInfo(OrderInfoDTO orderinfoDTO) {

    }
}
