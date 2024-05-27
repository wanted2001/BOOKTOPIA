package com.booktopia.www.domain;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
    private String id;  //사용자 ID
    private String pwd; //사용자 비밀번호
    private String name; //사용자 이름
    private String phone; //사용자 전화번호
    private String userDel; //탈퇴여부
    private int subNo; //구독정보
    private String userReg; //가입날짜
    private String userUp; //수정날짜
    private String userType; //가입유형

}
