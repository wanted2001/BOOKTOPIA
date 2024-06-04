package com.booktopia.www.repository;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.PagingVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    int insert(BoardVO boardVO);

    List<BoardVO> getList(PagingVO pgvo);

    int getTotalCount(PagingVO pgvo);
}
