package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DTO.myPagePayInfoDTO;
import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.PayVO;
import com.booktopia.www.domain.UserVO;
import com.booktopia.www.repository.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Override
    public int checkId(String id) {
        int isOk = userMapper.checkId(id);
        return isOk;
    }

    @Override
    public String isSocialUser(String id) {
        return userMapper.isSocialUser(id);
    }

    @Override
    public void modifyMyinfo(UserVO uvo) {
        userMapper.modifyMyinfo(uvo);
    }

    @Override
    public void modifyMyinfoWithPwd(UserVO uvo) {
        userMapper.modifyMyinfoWithPwd(uvo);
    }

    @Override
    public String findId(String userName) {
        return userMapper.findId(userName);
    }

    @Override
    public void updateAddr(UserVO uvo) {
        userMapper.updateAddr(uvo);
    }

    @Override
    public int deleteMyPageUser(String id) {

        return userMapper.deleteMyPageUser(id);
    }

    @Transactional
    @Override
    public myPagePayInfoDTO getPlist(String id) {
        PayVO payVO = userMapper.selectPayInfo(id);
        OrderInfoVO orderInfoVO = userMapper.selectOrderInfo(id);
        myPagePayInfoDTO myPagePayInfoDTO = new myPagePayInfoDTO(payVO,orderInfoVO);
        return myPagePayInfoDTO;
    }

    @Override
    public int findPwCheck(UserVO uvo) {
        return userMapper.findPwCheck(uvo);
    }



}
