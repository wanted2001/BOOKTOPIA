package com.booktopia.www.service;

import com.booktopia.www.domain.CommentVO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.RecommentVO;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.repository.CommentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentMapper commentMapper;

    @Override
    public int post(CommentVO cvo) {
        return commentMapper.post(cvo);
    }

    @Override
    public PagingHandler getCommentList(int bno, PagingVO pgvo) {
        List<CommentVO> clist = commentMapper.getCommentList(bno,pgvo);
        //totalCount
        int totalCount = commentMapper.getSelectOneComment(bno);
        PagingHandler ph = new PagingHandler(pgvo, totalCount, clist,null);
        return ph;
    }

    @Override
    public int modify(CommentVO commentVO) {
        return commentMapper.modify(commentVO);
    }

    @Override
    public int deleteComment(long cno) {
        return commentMapper.deleteComment(cno);
    }

    @Override
    public long getCommentBno(long cno) {
        return commentMapper.getCommentBno(cno);
    }

}
