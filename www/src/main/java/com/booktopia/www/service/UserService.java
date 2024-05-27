package com.booktopia.www.service;

import com.booktopia.www.domain.UserVO;

public interface UserService {

    // 회원가입
    int joinInsert(UserVO uvo);

    // 중복확인
    int checkId(String id);
}
