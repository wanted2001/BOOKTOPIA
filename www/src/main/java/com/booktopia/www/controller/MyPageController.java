package com.booktopia.www.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MyPageController {

    @GetMapping("/modify")
    public void modify() {}

    @GetMapping("/changeaddr")
    public void changeaddr() {}

    @GetMapping("/couponlist")
    public void couponlist() {}

    @GetMapping("/subinfo")
    public void subinfo() {}

    @GetMapping("/payinfo")
    public void payinfo() {}
}
