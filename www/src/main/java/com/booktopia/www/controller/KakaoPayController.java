package com.booktopia.www.controller;

import com.booktopia.www.service.KakaoPayService;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Slf4j
@RequestMapping("/kakao/*")
public class KakaoPayController {

    @Setter(onMethod_ = {@Autowired})
    private KakaoPayService kakaoPayService;

    @GetMapping("/ready")
    public String kakaoPay(){
        log.info("kakao pay ready in!!!");
        return "redirect:"+kakaoPayService.kakaoPayReady();
    }

    @GetMapping("/kakaoPaySuccess")
    public void kakaoPaySuccess(@RequestParam("pg_token")String pg_token, Model m){
        log.info("get success in~~~");
        log.info("get token"+pg_token);

        m.addAttribute("info",kakaoPayService.kakaoPayInfo(pg_token));
    }

}
