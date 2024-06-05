package com.booktopia.www.controller;

import com.booktopia.www.domain.HeartVO;
import com.booktopia.www.service.UserService;
import com.booktopia.www.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("/vote")
@Slf4j
public class VoteController {

    private final VoteService voteService;
    private final UserService userService;

}
