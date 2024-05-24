package com.booktopia.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private String amount; // 결제 금액
    private String approvedAt; // 결제승인 시각


}
