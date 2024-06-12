package com.booktopia.www.repository;

import com.booktopia.www.domain.CommentVO;
import com.booktopia.www.domain.PagingVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    int post(CommentVO cvo);

    List<CommentVO> getCommentList(@Param("bno")int bno, @Param("pgvo")PagingVO pgvo);

    int getSelectOneComment(int bno);

    int modify(CommentVO commentVO);

    int deleteComment(long cno);

    long getCommentBno(long cno);

    List<CommentVO> getComList();
}
