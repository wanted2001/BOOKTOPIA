package com.booktopia.www.domain;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class VoteVO {

    private int voteBno; //찬반게시글번호(1)
    private String id; //투표할 유저 아이디
    private int voteResult; //투표결과 (찬성 0 / 반대 1)

}
