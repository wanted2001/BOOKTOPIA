package com.booktopia.www.controller;

import com.booktopia.www.domain.AdCouponVO;
import com.booktopia.www.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/coupon/*")
public class CouponController {
    private final CouponService cusv;

    @PostMapping("/sale/{couNo}")
    @ResponseBody
    public float couponInfo(@PathVariable("couNo") int couNo) {
        AdCouponVO advo = cusv.getCoupon(couNo);
        float saleAmount = cusv.getSaleAmount(couNo);
        log.info("sale Amount >>>>>{}", saleAmount);
        return saleAmount;
    }
}
