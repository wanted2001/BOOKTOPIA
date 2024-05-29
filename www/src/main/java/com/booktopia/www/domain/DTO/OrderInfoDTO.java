package com.booktopia.www.domain.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderInfoDTO {
    //결제정보 담을 DTO
    private long orderNo; //주문번호
    private String id;
    private String payName;
    private int amount;
    private int totalAmount;
}
