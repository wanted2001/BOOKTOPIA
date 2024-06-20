package com.booktopia.www.repository;

import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.QnaVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QnaMapper {

    int insertqna(QnaVO qnaVO);

    List<QnaVO> getqnalist(String id);

    int qnaCount();

    List<QnaVO> getList(PagingVO qnaPgvo);

    void oneUserList(String id);


    void updateAnswer(@Param("qnaAnswer") String qnaAnswer, @Param("id") String id);
}
