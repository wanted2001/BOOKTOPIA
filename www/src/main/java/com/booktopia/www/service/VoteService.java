package com.booktopia.www.service;

import com.booktopia.www.domain.VoteVO;

public interface VoteService {
    void insert(VoteVO voteVO);

    String getUser(String id);


//    VoteVO getUser(String getUser);

//    VoteVO getUser(VoteVO voteVO);
}
