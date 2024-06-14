package com.booktopia.www.repository;

import com.booktopia.www.domain.HeartVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

@Mapper
public interface HeartMapper {
    HeartVO getUser(@Param("id")String id, @Param("bno")long bno);

    void insertHeart(HeartVO hvo);

    HeartVO getBno(long bno);

    HeartVO getHeartInfo(@Param("bno") HeartVO heartVO, @Param("id") String id);
}
