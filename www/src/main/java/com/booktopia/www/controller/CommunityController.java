package com.booktopia.www.controller;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.DTO.BoardDTO;
import com.booktopia.www.domain.FileVO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.domain.VoteVO;
import com.booktopia.www.handler.FileHandler;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.service.BoardService;
import com.booktopia.www.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RequestMapping("/community/*")
@Controller
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService csv;
    private final BoardService bsv;
    private final FileHandler fh;

    @GetMapping("/communityMain")
    public void commMain(){}

    @GetMapping("/communityList")
    public void commList(Model m, PagingVO pgvo){
        log.info("pgvo>>>>{}",pgvo);
        //전체 게시글 수
        int totalCount = bsv.getTotalCount(pgvo);

        PagingHandler ph = new PagingHandler(pgvo,totalCount);
        log.info("ph>>>>>{}",ph);

        List<BoardVO> blist = bsv.getList(pgvo);
        log.info("blist>>>{}", blist);

        m.addAttribute("blist",blist);
        m.addAttribute("ph",ph);
    }

    @GetMapping("/communityDetail")
    public void commDetail(){}

    @GetMapping("/communityNotice")
    public void commNotice(){}


    @PostMapping("/push")
    public void votePush(VoteVO voteVO){
        log.info(">>> controller in >>> ,{}", voteVO);
    }
}
