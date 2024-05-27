package com.booktopia.www.service;

import com.booktopia.www.domain.BookVO;

import java.util.List;

public interface BookTopiaService {

    List<BookVO> getList(String btnResult);
}
