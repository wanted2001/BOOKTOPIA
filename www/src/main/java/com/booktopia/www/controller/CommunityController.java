package com.booktopia.www.controller;

import com.booktopia.www.domain.HeartVO;
import com.booktopia.www.service.CommunityService;
import com.booktopia.www.service.UserService;
import com.booktopia.www.service.VoteService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/community/*")
@Controller
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService csv;
    private final VoteService vsv;
    private final UserService usv;

    @GetMapping("/communityMain")
    public void commMain(){}

    @GetMapping("/communityList")
    public void commList(){}

    @GetMapping("/communityDetail")
    public void commDetail(){
    }

    @GetMapping("/communityNotice")
    public void commNotice(){}

    @GetMapping("/clickUp")
    public String clickUp(){
        log.info("community in");
        return "redirect:/community/communityMain";
    }

}
