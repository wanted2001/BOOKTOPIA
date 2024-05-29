package com.booktopia.www.service;

import com.booktopia.www.domain.DTO.KaKaoPayRequestDTO;
import com.booktopia.www.domain.DTO.KakaoReadyResponse;
import com.booktopia.www.domain.DTO.OrderInfoDTO;
import com.booktopia.www.repository.PayMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PayServiceImpl implements PayService{

    private final PayMapper payMapper; //private final OrderRepository orderRepository;

    static final String cid = "C32D2035D1F1FC997854";
    static final String admin_key = "9b05cd727ba09686a7fddb914b120d51";
    private KakaoReadyResponse kakaoReady;

    public KakaoReadyResponse getKakaoReady() {
        //카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        //서버와 주고받을 정보
        parameters.add("cid",cid); //가맹점코드
        parameters.add("partner_order_id", "1001"); //주문번호
        parameters.add("partner_order_id","mangseon2"); //주문자명
        parameters.add("item_name","3"); //구독개월수(상품이름)
        parameters.add("quantity","1"); //수량
        parameters.add("total_amount","32700"); //총 결제금액
        parameters.add("tax_free_amount","0");
//        parameters.add("approval_url","http://localhost:8099/pay/done");
//        parameters.add("cancel_url","http://localhost:8099/user/login");
//        parameters.add("fail_url","http://localhost:8099/subscribe/info");
        parameters.add("approval_url", "http://52.78.88.121:8080/account/pay/kakao/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "http://52.78.88.121:8080/account/pay/kakao/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "http://52.78.88.121:8080/account/pay/kakao/fail"); // 실패 시 redirect url

        //파라미터,헤더
        HttpEntity<MultiValueMap<String,String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        //외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoReady = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);

        return kakaoReady;
    }

    //카카오 요구 헤더값
    private HttpHeaders getHeaders(){
        HttpHeaders httpHeaders = new HttpHeaders();

        String admin = "KakaoAK "+ admin_key;

        httpHeaders.set("Authorization", admin);
        httpHeaders.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }

    //삭제예정
    @Override
    public void saveOrder(String id, List<OrderInfoDTO> orderInfoDTO) {

    }

}
