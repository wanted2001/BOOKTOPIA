package com.booktopia.www.service;

import com.booktopia.www.domain.HeartVO;
import com.booktopia.www.repository.BoardMapper;
import com.booktopia.www.repository.HeartMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class HeartServiceImpl implements HeartService{

    private final HeartMapper heartMapper;
    private final BoardMapper boardMapper;

    @Override
    public HeartVO getUser(String id, long bno) {
        return heartMapper.getUser(id, bno);
    }

    @Override
    public void insertHeart(HeartVO hvo) {
        heartMapper.insertHeart(hvo);
    }

    @Override
    public HeartVO getBno(long bno) {
        return heartMapper.getBno(bno);
    }

    @Override
    public HeartVO getHeartInfo(HeartVO heartVO, String id) {
        return heartMapper.getHeartInfo(heartVO, id);
    }


}
