package com.booktopia.www.service;

import com.booktopia.www.domain.CommentVO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.RecommentVO;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.repository.ReCommentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReCommentServiceImpl implements ReCommentService{
    private final ReCommentMapper reCommentMapper;

    @Override
    public int postromment(RecommentVO rvo) {
        return reCommentMapper.postromment(rvo);
    }

    @Override
    public PagingHandler getCommentList(int cno, PagingVO pgvo) {
        List<RecommentVO> rclist = reCommentMapper.getCommentList(cno,pgvo);
        //totalCount
        int totalCount = reCommentMapper.getSelectOneComment(cno);
        PagingHandler ph = new PagingHandler(pgvo, totalCount, null, rclist);
        return ph;
    }
}
