package com.booktopia.www.controller;

import com.booktopia.www.domain.VoteUserDTO;
import com.booktopia.www.domain.VoteVO;
import com.booktopia.www.service.CommunityService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/community/*")
@Controller
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService csv;

    @GetMapping("/communityMain")
    public void commMain(){}

    @GetMapping("/communityList")
    public void commList(){}

    @GetMapping("/communityDetail")
    public void commDetail(){}

    @GetMapping("/communityNotice")
    public void commNotice(){}

}
