package com.booktopia.www.service;

import com.booktopia.www.domain.UserVO;

public interface UserService {

    // 회원가입
    int joinInsert(UserVO uvo);

    int checkId(String id);

    String isSocialUser(String id);
}
