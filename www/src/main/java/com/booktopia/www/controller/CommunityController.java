package com.booktopia.www.controller;

import com.booktopia.www.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Slf4j
@RequestMapping("/comm/*")
@Controller
public class CommunityController {

    private final CommunityService csv;



}
