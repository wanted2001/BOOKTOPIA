package com.booktopia.www.domain.DTO;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OrderInfoDTO {
    //결제정보 담을 DTO
    private String tid;
    private String payName;
    private String amount;
    private String totalAmount;
    private String approvedAt;
    private String id;
    private String name;
    private String phone;
    private String address;

    @Builder
    public OrderInfoDTO(String tid, String payName, String amount, String totalAmount, String approvedAt, String id, String name, String phone, String address) {
        this.tid = tid;
        this.payName = payName;
        this.amount = amount;
        this.totalAmount = totalAmount;
        this.approvedAt = approvedAt;
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
}
