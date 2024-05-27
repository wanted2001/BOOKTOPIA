package com.booktopia.www.service;

import com.booktopia.www.domain.UserVO;
import com.booktopia.www.repository.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    // 회원가입
    @Override
    public int joinInsert(UserVO uvo) {
        int isOk = userMapper.joinInsert(uvo);
        return (isOk > 0 ? userMapper.insertAuth(uvo.getId()) : 0);
    }

    // 중복확인
    @Override
    public int checkId(String id) {
        log.info(id);
        int isOk = 1;
        UserVO checkmvo =  userMapper.checkId(id);
        if(checkmvo == null){
            isOk = 0;
        }
        return isOk;
    }

}
