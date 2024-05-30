package com.booktopia.www.repository;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DTO.OrderUserDTO;
import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.PayVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderInfoMapper {
    void regiOrderUser(OrderUserDTO oudto);

    int insertRegister(OrderInfoDTO oidto);
}
