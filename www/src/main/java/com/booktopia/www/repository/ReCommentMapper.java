package com.booktopia.www.repository;

import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.RecommentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReCommentMapper {
    int postromment(RecommentVO rvo);

    List<RecommentVO> getReCommentList(long cno, PagingVO pgvo);

    int deleteFromBoard(long bno);

    int deleteReComment(long cno);

    int rcCount(long cno);
}
