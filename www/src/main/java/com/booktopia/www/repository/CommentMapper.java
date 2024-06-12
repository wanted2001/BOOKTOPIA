package com.booktopia.www.repository;

import com.booktopia.www.domain.CommentVO;
import com.booktopia.www.domain.DTO.CommentDTO;
import com.booktopia.www.domain.PagingVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    int post(CommentVO cvo);

    int getSelectOneComment(int bno);

    int modify(CommentVO commentVO);

    int deleteComment(long cno);

    long getCommentBno(long cno);

    List<CommentVO> getCommentList(int bno, PagingVO pgvo);

    void deleteCommentFromBoard(long bno);
}
