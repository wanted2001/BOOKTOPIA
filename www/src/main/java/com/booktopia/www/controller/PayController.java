package com.booktopia.www.controller;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.DTO.OrderUserInfoDTO;
import com.booktopia.www.domain.SubscribeInfoVO;
import com.booktopia.www.service.PayService;
import com.booktopia.www.service.SubscribeService;
import com.siot.IamportRestClient.IamportClient;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/pay/*")
@Slf4j
@RequiredArgsConstructor
public class PayController {

    private final PayService psv;
    private final SubscribeService ssv;

    @Value("${imp.api.key}")
    private String api;
    @Value("${imp.api.secretkey}")
    private String secretkey;

    private IamportClient iamportClient;

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(api, secretkey);
    }

    @GetMapping("/getPay")
    public void getPay(Model m, @RequestParam("month")int month) {
        log.info("month값>>{}",month);
        SubscribeInfoVO ssivo = ssv.getPayInfo(month);
        log.info("ssivo>>{}",ssivo);
        m.addAttribute("ssivo", ssivo);
    }

    @GetMapping("/done")
    public void done() {
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completePay(@RequestBody List<OrderInfoDTO> orderInfoDTO) throws IOException {
        log.info("iamport값 >>{}", iamportClient);
        String tid = String.valueOf(orderInfoDTO.get(0).getTid());
        try {
            String id = orderInfoDTO.get(0).getId();
            psv.saveOrder(id, orderInfoDTO);
            log.info("결제성공 : 주문번호 {}", orderInfoDTO);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.info("주문 상품 환불 : 주문번호 {}", tid);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

//    @PostMapping("/order/payment")
//public ResponseEntity<String> paymentComplete @RequestBody List<OrderSaveDto> orderSaveDtos) throws IOException {
//        String orderNumber = String.valueOf(orderSaveDtos.get(0).getOrderNumber());
//        try {
//            Long userId = sessionUser.getUserIdNo();
//            paymentService.saveOrder(userId, orderSaveDtos);
//            log.info("결제 성공 : 주문 번호 {}", orderNumber);
//            return ResponseEntity.ok().build();
//        }
//        catch (RuntimeException e)
//        {
//            log.info("주문 상품 환불 진행 : 주문 번호 {}", orderNumber);
//            String token = refundService.getToken(apiKey, secretKey);
//            refundService.refundWithToken(token, orderNumber, e.getMessage());
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//    @PostMapping("/payment/validation/{imp_uid}")
//    @ResponseBody
//    public IamportResponse<Payment> validateIamport(@PathVariable String imp_uid) {
//        IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);
//        log.info("결제 요청 응답. 결제 내역 - 주문 번호: {}", payment.getResponse().getMerchantUid());
//        return payment;
//    }}