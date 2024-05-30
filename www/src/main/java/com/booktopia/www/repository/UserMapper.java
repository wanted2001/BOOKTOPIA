package com.booktopia.www.repository;

import com.booktopia.www.domain.AuthVO;
import com.booktopia.www.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    int joinInsert(UserVO uvo);

    int insertAuth(String id);

    UserVO checkId(String id);

    UserVO loginCheck(UserVO uvo);

    UserVO selectEmail(String id);

    List<AuthVO> selectAuths(String id);
}
