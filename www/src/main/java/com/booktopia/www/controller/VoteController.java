package com.booktopia.www.controller;

import com.booktopia.www.domain.HeartVO;
import com.booktopia.www.domain.VoteVO;
import com.booktopia.www.service.UserService;
import com.booktopia.www.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/vote")
@Slf4j
public class VoteController {

    private final VoteService voteService;
    private final UserService userService;

//    @PostMapping("/push")
//    @ResponseBody
//    public void votePush (VoteVO voteVO){
//        log.info(">>> voteVO controller >>> {} ", voteVO);
//        voteService.insert(voteVO);
//    }

}
