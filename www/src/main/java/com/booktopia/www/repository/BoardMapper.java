package com.booktopia.www.repository;

import com.booktopia.www.domain.BoardVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    int insert(BoardVO bvo);
}
