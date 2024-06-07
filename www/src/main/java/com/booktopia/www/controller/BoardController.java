package com.booktopia.www.controller;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.domain.DTO.BoardDTO;
import com.booktopia.www.domain.FileVO;
import com.booktopia.www.domain.PagingVO;
import com.booktopia.www.handler.FileHandler;
import com.booktopia.www.handler.PagingHandler;
import com.booktopia.www.service.BoardService;
import com.booktopia.www.service.FileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board/*")
public class BoardController {
    private final BoardService bsv;
    private final FileService fsv;

    @GetMapping("/register")
    public void register() {}

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody JSONObject bvo) throws ParseException {
        log.info("bvo>>>>>>{}",bvo);

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(String.valueOf(bvo));
        log.info("obj>>>>>>{}",obj);

        BoardVO boardVO = new BoardVO();
        boardVO.setId((String)obj.get("id"));;
        boardVO.setBTitle((String) obj.get("bTitle"));
        boardVO.setBContent((String) obj.get("bContent"));
        boardVO.setBWriter((String) obj.get("bWriter"));
        boardVO.setBCate((String)obj.get("bCate"));
        boardVO.setBMainImg((String)obj.get("bMainImg"));
        log.info("boardVO>>>>>>{}",boardVO);

        int isOk = bsv.insert(boardVO);
        if(isOk == 1){
            log.info("boardVO222222>>>>>>{}",boardVO);
//            fsv.insertFile(boardVO.getBno());
        }
        return ResponseEntity.ok("success");
    }

    @GetMapping("/communityList")
    public void commList(Model m, PagingVO pgvo){
        log.info("pgvo>>>>{}",pgvo);
        //전체 게시글 수
        int totalCount = bsv.getTotalCount(pgvo);

        PagingHandler ph = new PagingHandler(pgvo,totalCount);
        log.info("ph>>>>>{}",ph);

        List<BoardVO> blist = bsv.getList(pgvo);
        log.info("blist>>>{}", blist);

        List<FileVO> flist = fsv.getFileList();
        log.info("flist>>>{}", flist);

        m.addAttribute("blist",blist);
        m.addAttribute("ph",ph);
        m.addAttribute("flist",flist);
    }

    @GetMapping("/detail")
    public void detail(Model m, @RequestParam("bno")long bno){
        BoardVO bvo = bsv.getDetail(bno);
        log.info("detail bvo >>>>{}",bvo);
        m.addAttribute("bvo",bvo);
    }

    @GetMapping("/modify")
    public void modifyBoard(Model m, @RequestParam("bno")long bno){
        BoardVO bvo = bsv.getDetail(bno);
        log.info("modifyBoard bvo >>>>{}",bvo);
        m.addAttribute("bvo",bvo);
    }

    @PostMapping("/modify")
    public String modify(@RequestBody JSONObject bvo) throws ParseException {
        log.info("modify bvo>>>>>>{}",bvo);

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(String.valueOf(bvo));
        log.info("modify obj>>>>>>{}",obj);

        BoardVO boardVO = new BoardVO();
        boardVO.setBno(Long.parseLong((String) obj.get("bno")));
        boardVO.setId((String)obj.get("id"));;
        boardVO.setBTitle((String) obj.get("bTitle"));
        boardVO.setBContent((String) obj.get("bContent"));
        boardVO.setBWriter((String) obj.get("bWriter"));
        boardVO.setBCate((String)obj.get("bCate"));
        boardVO.setBMainImg((String)obj.get("bMainImg"));
        log.info("modify boardVO>>>>>>{}",boardVO);

        bsv.modify(boardVO);
        return "/";
    }

    @GetMapping("/delete")
    public String delete(@RequestParam("bno") long bno){
        bsv.delete(bno);
        return "redirect:/community/communityList";
    }


    @GetMapping("/socialId")
    public void socialId(){}

    @GetMapping("/userId")
    public void userId(){}



}
