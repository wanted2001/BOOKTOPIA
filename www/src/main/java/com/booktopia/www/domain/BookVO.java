package com.booktopia.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
// 책에 대한 VO
public class BookVO {
    private int bookCode; //책 코드
    private String bookTitle; //책 제목
    private String bookWriter; //책 글쓴이
    private String bookCate; //책 카테고리
    private String bookStory; //책 줄거리
}
