package com.booktopia.www.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

//배송
public class DeliveryVO {
    private String payNo; //주문번호
    private int bookCode; //책 코드
    private String id; //주문자 id
    private String deliDate; //발송일자
    private int deliStatus; //주문 상태 준비중 0 배송중 1 배송완료 2
}
