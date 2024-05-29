package com.booktopia.www.service;

import com.booktopia.www.repository.PayMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
@PropertySource("classpath:secretKey.properties")
public class PayServiceImpl implements PayServiceInterface {

//    private final PayMapper payMapper;
//
//    @Value("${imp.code}")
//    private String imp_code;
//
//    @Value("${imp.api.key}")
//    private String imp_api_key;
//
//    @Value("${imp.api.secretkey}")
//    private String imp_api_secretkey;
//
//    @Override
//    public String getToken() throws IOException{
//        HttpURLConnection conn = null;
//        URL url = new URL("https://api.iamport.kr/users/getToken");
//
//        conn = (HttpURLConnection) url.openConnection();
//
//        conn.setRequestMethod("POST");;
//        conn.setRequestProperty("Content-Type","application/json");
//        conn.setRequestProperty("Accept","application/json");
//        conn.setDoOutput(true);
//        JsonObject json = new JsonObject();
//
//        json.addProperty("imp_api_key", imp_api_key);
//        json.addProperty("imp_api_secretkey",imp_api_secretkey);
//
//        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//
//        bw.write(json.toString());
//        bw.flush();
//        bw.close();
//
//        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"utf-8"));
//
//        Gson gson = new Gson();
//
//        String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
//
//        String token = gson.fromJson(response, Map.class).get("access_token").toString();
//
//        br.close();
//        conn.disconnect();
//
//        return token;
//    }
//
//    @Override
//    public String paymentInfo(String impUid, String token) {
//        return "";
//    }
//
//    @Override
//    public void payMentCancel(String token, String impUid, String amount, String 결제_금액_오류) {
//
//    }




















//    static final String cid = "C32D2035D1F1FC997854";
//    static final String admin_key = "9b05cd727ba09686a7fddb914b120d51";
    //    private KakaoReadyResponse kakaoReady;

//    public KakaoReadyResponse getKakaoReady() {
//        //카카오페이 요청 양식
//        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
//
//        //서버와 주고받을 정보
//        parameters.add("cid",cid); //가맹점코드
//        parameters.add("partner_order_id", "1001"); //주문번호
//        parameters.add("partner_order_id","김정온"); //주문자명
//        parameters.add("item_name","3"); //구독개월수(상품이름)
//        parameters.add("quantity","1"); //수량
//        parameters.add("total_amount","32700"); //총 결제금액
//        parameters.add("tax_free_amount","0");
//        parameters.add("approval_url","http://localhost:8099/pay/done");
//        parameters.add("cancel_url","http://localhost:8099/user/login");
//        parameters.add("fail_url","http://localhost:8099/subscribe/info");
//
//        //파라미터,헤더
//        HttpEntity<MultiValueMap<String,String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
//
//        //외부에 보낼 url
//        RestTemplate restTemplate = new RestTemplate();
//
//        kakaoReady = restTemplate.postForObject(
//                "https://kapi.kakao.com/v1/payment/ready",
//                requestEntity,
//                KakaoReadyResponse.class);
//
//        return kakaoReady;
//    }
//
//    //카카오 요구 헤더값
//    private HttpHeaders getHeaders(){
//        HttpHeaders httpHeaders = new HttpHeaders();
//
//        String admin = "KakaoAK "+ admin_key;
//
//        httpHeaders.set("Authorization", admin);
//        httpHeaders.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        return httpHeaders;
//    }

}
