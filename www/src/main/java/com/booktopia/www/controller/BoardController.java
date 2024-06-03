package com.booktopia.www.controller;

import com.booktopia.www.domain.BoardVO;
import com.booktopia.www.service.BoardService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board/*")
public class BoardController {
    private final BoardService bsv;

    @GetMapping("/register")
    public void register() {}

    @PostMapping("/register")
    @ResponseBody
    public void Postregister(@RequestBody BoardVO bvo){
        log.info("bvo>>{}",bvo);
        bsv.insert(bvo);
    }
}
