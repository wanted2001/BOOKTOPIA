package com.booktopia.www.repository;

import com.booktopia.www.domain.AuthVO;
import com.booktopia.www.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    int joinInsert(UserVO uvo);

    int insertAuth(String id);

    List<AuthVO> selectAuths(String id);

    UserVO selectId(String id);

    UserVO selectSocialUser(String id);

    int registerOauthUser(UserVO userVO);

    int authUserRegister(String id);

}
