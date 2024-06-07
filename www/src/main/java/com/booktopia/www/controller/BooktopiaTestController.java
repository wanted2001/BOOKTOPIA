package com.booktopia.www.controller;

import com.booktopia.www.domain.BookVO;
import com.booktopia.www.domain.BooktopiaVO;
import com.booktopia.www.service.BookTopiaService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final BookTopiaService bookTopiaService;

    @GetMapping("/test")
    public void getBooktopia(){}

//    @PostMapping("test")
//    public String pushBooktopia(BooktopiaVO booktopiaVO){
//        log.info("controller in >>>> {}", booktopiaVO);
//        bookTopiaService.insert(booktopiaVO);
//        return "redirect:/booktopiaTest/bookList";
//    }

    @PostMapping("/bookList")
    public String btnResult(@RequestParam("btnResult") String btnResult, Model m, BooktopiaVO booktopiaVO){
        log.info(">> btnResult >> {}", btnResult);
        List<BookVO> blist = bookTopiaService.getList(btnResult);
        log.info(">>> booktopiaVO >> {}", booktopiaVO);
        bookTopiaService.insert(booktopiaVO);
        m.addAttribute("blist", blist);
        log.info(">>> blist >>> {}", blist);
        return "/booktopiaTest/bookList";
    }

}



