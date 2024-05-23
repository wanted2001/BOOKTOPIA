package com.booktopia.www.domain;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AddressVO {
    private String id; //사용자 id
    private String addr; //사용자 주소
}
