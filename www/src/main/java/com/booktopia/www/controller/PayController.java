package com.booktopia.www.controller;

import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.domain.OrderInfoVO;
import com.booktopia.www.domain.PayVO;
import com.booktopia.www.domain.SubscribeInfoVO;
import com.booktopia.www.service.*;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.*;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/pay/*")
@Slf4j
public class PayController {

    @Autowired
    private SubscribeService ssv;
    @Autowired
    private PayService psv; //implements 없음
    @Autowired
    private OrderInfoService osv;

    @Value("2171128503337876")
    private String api;
    @Value("KiIcCNRzGYoW6U45aU1n9xI8bJ98TlUQP9tF4A1pbe44jcxQt5FxAOispEqpYa17sjNjaRojnO8GM4s6")
    private String secretkey;

    private IamportClient iamportClient = new IamportClient(api, secretkey);


    public PayController() {
        this.iamportClient = new IamportClient("2171128503337876",
                "KiIcCNRzGYoW6U45aU1n9xI8bJ98TlUQP9tF4A1pbe44jcxQt5FxAOispEqpYa17sjNjaRojnO8GM4s6");
    }

    @GetMapping("/done/{id}")
    public String done(@PathVariable("id") String id, Model m, OrderInfoDTO oidto) {
        log.info("get 들어옴 >>> ");
        log.info(">>>>> getPay oidto 111111 >>>> {}", id);

//        osv.getSuccessPayInfo(oidto);
        log.info(">>>>> getPay oidto 2222222 >>>> {}", oidto);
        m.addAttribute("id", id);
        return "/pay/done";
    }

    @PostMapping("/done")
    @ResponseBody
    public OrderInfoDTO postDone(@RequestBody OrderInfoDTO oidto){
        log.info(">>> 들어옴 >>> ");
        log.info(">>>>> pay done oidto >>>> {}", oidto);
        OrderInfoDTO resultOidto = osv.getSuccessPayInfo(oidto);
        //re.addAttribute("oidto", oidto);
//        re.addAttribute("oidto", oidto);
        return resultOidto;
    }

    @GetMapping("/getPay")
    public void getPay(Model m, @RequestParam("month") int month) {
        log.info("month값>>{}", month);
        SubscribeInfoVO ssivo = ssv.getPayInfo(month);
        log.info("ssivo>>{}", ssivo);
        m.addAttribute("ssivo", ssivo);
    }

    @PostMapping("/pay_ing/{imp_uid}")
    @ResponseBody
    public IamportResponse<Payment> paymentByImpUid(Model m, Locale locale, HttpSession session,
                                                    @PathVariable(value = "imp_uid") String imp_uid) throws IamportResponseException, IOException {
        log.info("확인확인");
        log.info("imp_uid들어오는지 확인 >> {}", imp_uid);

        log.info("session >>> {}", session);
//        m.addAttribute("orderNo", l)

        return iamportClient.paymentByImpUid(imp_uid);
    }


    @PostMapping("/savePayinfo")
    @ResponseBody
    public String savePayInfo(@RequestBody OrderInfoDTO oidto) {
        log.info(">>> oidto controller >>> {}", oidto);

        int isOk = osv.insertRegister(oidto);
        return isOk > 0 ? "1" : "0";
    }

    @PostMapping("/getToken")
    @ResponseBody
    public ResponseEntity<String> getToken (){

        // api url
        String url = "https://api.iamport.kr/users/getToken";

        // api에 보내는 전송 데이터
        String apiKey = "2171128503337876";
        String secretKey = "KiIcCNRzGYoW6U45aU1n9xI8bJ98TlUQP9tF4A1pbe44jcxQt5FxAOispEqpYa17sjNjaRojnO8GM4s6";
        String requestBody = "{\"imp_key\": \"" + apiKey + "\", \"imp_secret\": \"" + secretKey + "\"}";

        // api 호출을 위한 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        //RestTemplate 사용하여 iamport api 호출
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        log.info("response >>>> {}", response);


        // 응답을 클라이어트에게 반환
        return response;
    }

    @PostMapping("/payInfo")
    public void payInsert(OrderInfoVO oivo){
        log.info("post payInfo in >>>>> ");
        log.info(">>> oivo >>>> {}", oivo);
    }

}


