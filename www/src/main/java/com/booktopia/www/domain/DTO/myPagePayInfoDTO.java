package com.booktopia.www.domain.DTO;

import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.PayVO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class myPagePayInfoDTO {

    private  PayVO payVO;
    private  OrderInfoVO orderInfoVO;
}
