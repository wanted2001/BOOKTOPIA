package com.booktopia.www.service;

import com.booktopia.www.domain.BookVO;
import com.booktopia.www.repository.BookTopiaMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookTopiaServiceImpl implements BookTopiaService{

    private final BookTopiaMapper bookTopiaMapper;

    @Override
    public List<BookVO> getList(String btnResult) {
        log.info(">> btnResult >> {}", btnResult);

        return List.of();
    }
}
