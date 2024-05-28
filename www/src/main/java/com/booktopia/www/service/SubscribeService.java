package com.booktopia.www.service;

import com.booktopia.www.domain.SubscribeInfoVO;

import java.util.List;

public interface SubscribeService {

    SubscribeInfoVO getPayInfo(int month);

    List<SubscribeInfoVO> getPayShipNo();
}
