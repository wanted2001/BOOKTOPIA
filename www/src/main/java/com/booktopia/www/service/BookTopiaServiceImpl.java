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
    public void insert(String btnResult) {
        int totalCnt = Integer.parseInt(btnResult);
        log.info(">>> totalCnt >> {}", totalCnt);
        if(10 <= totalCnt && totalCnt <= 13){
            bookTopiaMapper.getBootListOne(btnResult);
        } else if(14<= totalCnt && totalCnt <=17){
            bookTopiaMapper.getBootListTwo(btnResult);
        } else if (18<= totalCnt && totalCnt <=20) {
            bookTopiaMapper.getBootListThree(btnResult);
        }
    }

    @Override
    public List<BookVO> getList(String btnResult) {
        log.info(">> btnResult >> {}", btnResult);
        return List.of();
    }
}
