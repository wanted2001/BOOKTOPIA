package com.booktopia.www.repository;

import com.booktopia.www.domain.AuthVO;
import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.PayVO;
import com.booktopia.www.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    int joinInsert(UserVO uvo);

    int insertAuth(String id);

    List<AuthVO> selectAuths(String id);

    UserVO selectId(String id);

    UserVO findByEmail(String pwd);

    int saveOauthUser(UserVO user);

    int checkId(String id);

    String isSocialUser(String id);

    void modifyMyinfo(UserVO uvo);

    void modifyMyinfoWithPwd(UserVO uvo);

    String findId(String userName);

    void updateAddr(UserVO uvo);

    void joinInsertOauth(UserVO uvo);

    int findPwCheck(UserVO uvo);

    String findUserByUserId(String email);

    void updateUserPassword(String id, String pw);

    int deleteMyPageUser(String id);

    PayVO selectPayInfo(String id);

    OrderInfoVO selectOrderInfo(String id);
}
