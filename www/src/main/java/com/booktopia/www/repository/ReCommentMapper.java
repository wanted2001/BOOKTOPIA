package com.booktopia.www.repository;

import com.booktopia.www.domain.RecommentVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReCommentMapper {
    int postromment(RecommentVO rvo);
}
