package com.booktopia.www.domain.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderUserInfoDTO {
    //결제할 유저, 결제할 상품 정보 담을 DTO
    private int shipNo; //구독권번호
    private int subInMonth; //구독권 개월수(이름)
    private int subInPrice; //구독권가격
    private String id; //주문자아이디
    private String name; //주문자이름
    private String phone; //주문자번호
    private String address; //주문자주소

    @Builder
    public OrderUserInfoDTO(int shipNo, int subInMonth, int subInPrice, String id, String name, String phone, String address) {
        this.shipNo = shipNo;
        this.subInMonth = subInMonth;
        this.subInPrice = subInPrice;
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address=address;
    }
}
