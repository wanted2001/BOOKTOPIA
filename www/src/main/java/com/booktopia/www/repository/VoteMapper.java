package com.booktopia.www.repository;

import com.booktopia.www.domain.VoteVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VoteMapper {
    void insert(VoteVO voteVO);

    String getUser(String id);

//    VoteVO getUser(String getUser);

//    VoteVO getUser(VoteVO voteVO);
}
