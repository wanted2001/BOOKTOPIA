package com.booktopia.www.domain;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CouponUserVO {
    private String id; //사용자 id
    private int couNo; //쿠폰 번호
    private String couUse; // 쿠폰 사용여부
}
