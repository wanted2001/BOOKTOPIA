package com.booktopia.www.repository;

import com.booktopia.www.domain.BookVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookTopiaMapper {

    List<BookVO> getList(String btnResult);

    List<BookVO> getListType(String ResultType);

//    void getListB(String btnResult);
//
//    void getListC(String btnResult);
//
//    void getListD(String btnResult);
//
//    void getListE(String btnResult);
//
//    void getListF(String btnResult);
}
