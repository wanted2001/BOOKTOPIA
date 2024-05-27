package com.booktopia.www.domain;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BooktopiaVO {
    private String id; // 사용자 id
    private String birth; //사용자 생일
    private int gender; //사용자 성별

    private int btnResult; // 설문

}
