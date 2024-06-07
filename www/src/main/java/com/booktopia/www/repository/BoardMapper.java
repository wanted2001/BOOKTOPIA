package com.booktopia.www.repository;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.PagingVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
    int insert(BoardVO boardVO);

    List<BoardVO> getList(PagingVO pgvo);

    int getTotalCount(PagingVO pgvo);

    BoardVO getDetail(long bno);

    void modify(BoardVO boardVO);

    void delete(long bno);

    long getBno();
}
