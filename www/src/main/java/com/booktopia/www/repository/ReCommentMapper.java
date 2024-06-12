package com.booktopia.www.repository;

import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.RecommentVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReCommentMapper {
    int postromment(RecommentVO rvo);

    List<RecommentVO> getReCommentList(@Param("cno") int cno,@Param("pgvo") PagingVO pgvo);
}
