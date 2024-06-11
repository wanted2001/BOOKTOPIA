package com.booktopia.www.service;

import com.booktopia.www.domain.RecommentVO;
import com.booktopia.www.repository.ReCommentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReCommentServiceImpl implements ReCommentService{
    private final ReCommentMapper reCommentMapper;

    @Override
    public int postromment(RecommentVO rvo) {
        return reCommentMapper.postromment(rvo);
    }
}
