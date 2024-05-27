package com.booktopia.www.domain;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
// 가격 정보 가져오는 VO
public class PayVO {

    private String tid; // 주문번호
    private String id; // user id
    private String cid; // 가맹점 번호
    private String payName; //결제할 제품명(구독권이름)
    private String amount; // 수량(1)
    private String totalAmount; //총 결제금액
    private String approvedAt; // 결제승인 시각

}
