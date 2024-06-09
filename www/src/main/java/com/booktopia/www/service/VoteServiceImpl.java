package com.booktopia.www.service;

import com.booktopia.www.domain.VoteVO;
import com.booktopia.www.repository.VoteMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoteServiceImpl implements VoteService {

    private final VoteMapper voteMapper;

    @Override
    public void insert(VoteVO voteVO) {
        voteMapper.insert(voteVO);
    }

    @Override
    public String getUser(String id) {
        return voteMapper.getUser(id);
    }

//    @Override
//    public VoteVO getUser(String getUser) {
//        return voteMapper.getUser(getUser);
//    }
//
//    @Override
//    public VoteVO getUser(VoteVO voteVO) {
//        return voteMapper.getUser(voteVO);
//    }

}
