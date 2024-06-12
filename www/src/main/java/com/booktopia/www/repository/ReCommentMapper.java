package com.booktopia.www.repository;

import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.RecommentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReCommentMapper {
    int postromment(RecommentVO rvo);

    List<RecommentVO> getReCommetList(int cno);

    List<RecommentVO> getCommentList(int cno, PagingVO pgvo);

    int getSelectOneComment(int cno);
}
