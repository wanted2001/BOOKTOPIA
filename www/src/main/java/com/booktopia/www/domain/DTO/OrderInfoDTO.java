package com.booktopia.www.domain.DTO;

import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.PayVO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderInfoDTO {
    //결제정보 담을 DTO
    private String impUid;
    private String merchantUid; //주문번호
    private String id;
    private String ordName;
    private String ordEmail;
    private String itemName;
    private int amount;
    private int totalAmount;

//    private OrderInfoVO oivo;
//    private PayVO pvo;
}
