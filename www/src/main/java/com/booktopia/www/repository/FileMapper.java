package com.booktopia.www.repository;

import com.booktopia.www.domain.FileVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
    void insertFile(FileVO fvo);
}
