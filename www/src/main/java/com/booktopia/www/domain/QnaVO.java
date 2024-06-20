package com.booktopia.www.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QnaVO {
    private String id; // 유저아이디
    private String qnaTitle; // 유저가 쓴 문의 제목
    private String qnaContent; //유저가 쓴 본문
    private String qnaAnswer; // 어드민이 작성한 답변
    private String qnaRegAt; // 유저가 쓴 작성날짜
    private String qnaModAt; // 어드민이 쓴 날짜

}
