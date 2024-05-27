package com.booktopia.www.service;

import com.booktopia.www.domain.BookVO;

import java.util.List;

public interface BookTopiaService {
    void insert(String btnResult);

    List<BookVO> getList(String btnResult);
}
