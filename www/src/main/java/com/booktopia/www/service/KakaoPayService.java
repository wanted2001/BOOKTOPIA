package com.booktopia.www.service;

import com.booktopia.www.domain.KakaoPayApprovalVO;
import com.booktopia.www.domain.KakaoPayVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;


@Service
@Slf4j
public class KakaoPayService {
    private static final String HOST = "https://kapi.kakao.com/v2/";

    private KakaoPayVO kakaoPayVO;
    private KakaoPayApprovalVO kakaoPayApprovalVO;

    public String kakaoPayReady() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakoAK 9b05cd727ba09686a7fddb914b120d51");
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8");

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
        parameters.add("cid", "C32D2035D1F1FC997854");
        parameters.add("partner_order_id", "1"); //주문번호
        parameters.add("partner_order_id", "qansd"); //주문자명
        parameters.add("item_name", "3"); //구독개월수(상품이름)
        parameters.add("quantity", "1"); //수량
        parameters.add("total_amount", "32700"); //총 결제금액
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:8099/pay/done");
        parameters.add("cancel_url", "http://localhost:8099/user/login");
        parameters.add("fail_url", "http://localhost:8099/subscribe/info");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(parameters, headers);

        try {
            kakaoPayVO = restTemplate.postForObject(new URI(HOST + "/payment/ready"), body, kakaoPayVO.getClass());
            log.info("kakao pay 값" + kakaoPayVO);
            return kakaoPayVO.getNext_redirect_pc_url();
        } catch (RestClientException e){
            e.printStackTrace();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }

        return "/kakao/pay/payment";
    }

    public KakaoPayApprovalVO kakaoPayInfo(String pg_token){
        log.info("kakaoPayInfo");

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","KakaoAK 9b05cd727ba09686a7fddb914b120d51");
        headers.add("Accept",MediaType.APPLICATION_JSON_VALUE);
        headers.add("Content-Type",MediaType.APPLICATION_FORM_URLENCODED_VALUE+ ";charset=UTF-8");

        MultiValueMap<String,String> parameters = new LinkedMultiValueMap<String,String>();
        parameters.add("cid","C32D2035D1F1FC997854");
        parameters.add("tid",kakaoPayVO.getTid());
        parameters.add("partner_order_id", "1");
        parameters.add("partner_user_id","qansd5");
        parameters.add("pg_token",pg_token);
        parameters.add("total_amount","32700");

        HttpEntity<MultiValueMap<String,String>> body = new HttpEntity<MultiValueMap<String,String>>(parameters,headers);

        try {
            kakaoPayApprovalVO = restTemplate.postForObject(new URI(HOST+"/payment/approve"),body,kakaoPayApprovalVO.getClass());
        } catch (RestClientException e){
            e.printStackTrace();
        } catch (URISyntaxException e){
            e.printStackTrace();
        }

        return null;
    }

}
