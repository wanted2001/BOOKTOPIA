package com.booktopia.www.service;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.repository.BoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardMapper boardMapper;

    @Override
    public int insert(BoardVO boardVO) {
        log.info("Service boardVO>>>>>{}",boardVO);
        return boardMapper.insert(boardVO);
    }

    @Override
    public int getTotalCount(PagingVO pgvo) {
        return boardMapper.getTotalCount(pgvo);
    }

    @Override
    public List<BoardVO> getList(PagingVO pgvo) {
        return boardMapper.getList(pgvo);
    }

    @Override
    public BoardVO getDetail(long bno) {
        return boardMapper.getDetail(bno);
    }

    @Override
    public void modify(BoardVO boardVO) {
        boardMapper.modify(boardVO);
    }

    @Override
    public void delete(long bno) {
        boardMapper.delete(bno);
    }

    @Override
    public long getBno() {
        return boardMapper.getBno();
    }


}
