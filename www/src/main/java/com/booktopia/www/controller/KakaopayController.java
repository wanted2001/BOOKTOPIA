package com.booktopia.www.controller;

import com.booktopia.www.service.KakaopayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay/kakao")
public class KakaopayController {
    private final KakaopayService kakaopayService;

}
