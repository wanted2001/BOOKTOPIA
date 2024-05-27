package com.booktopia.www.controller;

import com.booktopia.www.domain.BookVO;
import com.booktopia.www.domain.BooktopiaVO;
import com.booktopia.www.service.BookTopiaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/booktopiaTest/*")
@RequiredArgsConstructor
@Slf4j
public class BooktopiaTestController {
    private final BookTopiaService bts;

    @GetMapping("/test")
    public void getBooktopia(){}

    @GetMapping("/bookList")
    public void testResultList(){}

    @PostMapping("/bookList")
    @ResponseBody
    public String btnResult(@RequestBody String btnResult, Model m){
        log.info(">> btnResult >> {}", btnResult);
        List<BookVO> blist = bts.getList(btnResult);
        m.addAttribute("blist", blist);
        bts.insert(btnResult);
        return "1";
    }
}



