package com.booktopia.www.service;

import com.booktopia.www.domain.HeartVO;

public interface HeartService {

    HeartVO getUser(String id, long bno);

    void insertHeart(HeartVO hvo);

    HeartVO getBno(long bno);

    HeartVO getHeartInfo(HeartVO heartVO, String id);
}
