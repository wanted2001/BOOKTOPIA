package com.booktopia.www.service;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.repository.BoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardMapper boardMapper;

    @Override
    public int insert(BoardVO bvo) {
        return boardMapper.insert(bvo);
    }
}
