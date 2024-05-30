package com.booktopia.www.controller;

import com.booktopia.www.domain.DTO.KaKaoPayRequestDTO;
import com.booktopia.www.domain.DTO.KakaoReadyResponse;
import com.booktopia.www.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/account/pay/kakao")
@Slf4j
public class KakaoPaymentController {

    private final KakaoPayService kakaoPayService;


}
