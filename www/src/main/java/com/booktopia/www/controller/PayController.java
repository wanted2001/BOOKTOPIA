package com.booktopia.www.controller;

import com.booktopia.www.service.PayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pay/*")
@Slf4j
@RequiredArgsConstructor
public class PayController {

    private final PayService psv;

    @GetMapping("/getPay")
    public void getPay(){}

    @GetMapping("/done")
    public void done(){}

}
